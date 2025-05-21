
CREATE TABLE security_checkpoints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE security_personnel (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  checkpoint_id UUID REFERENCES security_checkpoints(id),
  position TEXT NOT NULL,
  shift_start TIME,
  shift_end TIME,
  is_on_duty BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE authorized_guardians (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  guardian_id UUID REFERENCES users(id) ON DELETE CASCADE,
  relationship TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  verification_photo TEXT,
  verification_questions JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, guardian_id)
);

CREATE TABLE temporary_authorizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  authorized_by UUID REFERENCES users(id) ON DELETE CASCADE,
  delegate_name TEXT NOT NULL,
  delegate_id_number TEXT,
  delegate_phone TEXT NOT NULL,
  delegate_photo TEXT,
  relationship TEXT NOT NULL,
  verification_code TEXT,
  valid_from TIMESTAMPTZ NOT NULL,
  valid_until TIMESTAMPTZ NOT NULL,
  special_instructions TEXT,
  is_used BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE student_checkpoints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES users(id) ON DELETE CASCADE,
  checkpoint_id UUID REFERENCES security_checkpoints(id),
  personnel_id UUID REFERENCES users(id),
  event_type TEXT NOT NULL CHECK (event_type IN ('check_in', 'check_out')),
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  guardian_id UUID REFERENCES users(id),
  temp_authorization_id UUID REFERENCES temporary_authorizations(id),
  verification_method TEXT NOT NULL CHECK (verification_method IN ('id_card', 'guardian_verification', 'temp_code', 'biometric', 'override')),
  photo_captured TEXT,
  location_data JSONB,
  notes TEXT,
  is_anomaly BOOLEAN DEFAULT false,
  anomaly_reason TEXT
);

CREATE TABLE security_incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reported_by UUID REFERENCES users(id),
  checkpoint_id UUID REFERENCES security_checkpoints(id),
  incident_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  description TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL CHECK (status IN ('reported', 'investigating', 'resolved', 'closed')),
  resolution TEXT,
  involved_students UUID[] REFERENCES users(id),
  involved_guardians UUID[] REFERENCES users(id)
);

CREATE TABLE security_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  triggered_by UUID REFERENCES users(id),
  alert_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'alert', 'emergency')),
  message TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES users(id),
  resolution_notes TEXT
);

CREATE TABLE security_policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  policy_type TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  policy_data JSONB NOT NULL
);


ALTER TABLE security_checkpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_personnel ENABLE ROW LEVEL SECURITY;
ALTER TABLE authorized_guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE temporary_authorizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_checkpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_policies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Security checkpoints viewable by authenticated users" ON security_checkpoints
  FOR SELECT USING (auth.role() IN ('authenticated'));

CREATE POLICY "Only admins can manage security checkpoints" ON security_checkpoints
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Security personnel viewable by authenticated users" ON security_personnel
  FOR SELECT USING (auth.role() IN ('authenticated'));

CREATE POLICY "Only admins can manage security personnel" ON security_personnel
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Authorized guardians viewable by security personnel and admins" ON authorized_guardians
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND (role = 'admin' OR id IN (SELECT id FROM security_personnel))
    )
  );

CREATE POLICY "Parents can view their own authorized guardian records" ON authorized_guardians
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'parent' AND id = guardian_id
    )
  );

CREATE POLICY "Only admins and parents can manage authorized guardians" ON authorized_guardians
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND (
        role = 'admin' OR 
        (role = 'parent' AND id = guardian_id)
      )
    )
  );

CREATE POLICY "Temporary authorizations viewable by security personnel and admins" ON temporary_authorizations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND (role = 'admin' OR id IN (SELECT id FROM security_personnel))
    )
  );

CREATE POLICY "Parents can view and manage their own temporary authorizations" ON temporary_authorizations
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'parent' AND id = authorized_by
    )
  );

CREATE POLICY "Student checkpoints viewable by security personnel and admins" ON student_checkpoints
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND (role = 'admin' OR id IN (SELECT id FROM security_personnel))
    )
  );

CREATE POLICY "Parents can view checkpoints for their children" ON student_checkpoints
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users u
      JOIN students s ON s.id = student_checkpoints.student_id
      WHERE u.id = auth.uid() AND u.role = 'parent' AND s.parent_id = u.id
    )
  );

CREATE POLICY "Security personnel can create checkpoint records" ON student_checkpoints
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM security_personnel
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Security incidents viewable by security personnel and admins" ON security_incidents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND (role = 'admin' OR id IN (SELECT id FROM security_personnel))
    )
  );

CREATE POLICY "Security personnel can report incidents" ON security_incidents
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM security_personnel
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Security alerts viewable by all authenticated users" ON security_alerts
  FOR SELECT USING (auth.role() IN ('authenticated'));

CREATE POLICY "Only admins and security personnel can manage alerts" ON security_alerts
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND (role = 'admin' OR id IN (SELECT id FROM security_personnel))
    )
  );

CREATE POLICY "Security policies viewable by security personnel and admins" ON security_policies
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND (role = 'admin' OR id IN (SELECT id FROM security_personnel))
    )
  );

CREATE POLICY "Only admins can manage security policies" ON security_policies
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_security_checkpoints_updated_at
BEFORE UPDATE ON security_checkpoints
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_security_personnel_updated_at
BEFORE UPDATE ON security_personnel
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_authorized_guardians_updated_at
BEFORE UPDATE ON authorized_guardians
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_temporary_authorizations_updated_at
BEFORE UPDATE ON temporary_authorizations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_security_policies_updated_at
BEFORE UPDATE ON security_policies
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
