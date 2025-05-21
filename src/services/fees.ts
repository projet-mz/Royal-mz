import { supabase } from '../lib/supabase/client';
import { Fee } from '../lib/types';
import { sanitizeInput } from './security';

/**
 * Get all fees
 */
export async function getFees() {
  try {
    const { data, error } = await supabase
      .from('fees')
      .select(`
        *,
        student:student_id (*)
      `);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting fees:', error);
    return { data: null, error };
  }
}

/**
 * Get fee by ID
 */
export async function getFeeById(id: string) {
  try {
    const { data, error } = await supabase
      .from('fees')
      .select(`
        *,
        student:student_id (*)
      `)
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting fee:', error);
    return { data: null, error };
  }
}

/**
 * Get fees by student ID
 */
export async function getFeesByStudent(studentId: string, status?: 'paid' | 'pending' | 'overdue') {
  try {
    let query = supabase
      .from('fees')
      .select('*')
      .eq('student_id', studentId);
      
    if (status) {
      query = query.eq('status', status);
    }
    
    const { data, error } = await query.order('due_date', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting fees by student:', error);
    return { data: null, error };
  }
}

/**
 * Get fees by status
 */
export async function getFeesByStatus(status: 'paid' | 'pending' | 'overdue') {
  try {
    const { data, error } = await supabase
      .from('fees')
      .select(`
        *,
        student:student_id (*)
      `)
      .eq('status', status)
      .order('due_date', { ascending: false });
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting fees by status:', error);
    return { data: null, error };
  }
}

/**
 * Create a new fee
 */
export async function createFee(fee: Omit<Fee, 'id'>) {
  try {
    const sanitizedPaymentMethod = fee.paymentMethod ? sanitizeInput(fee.paymentMethod) : null;
    const sanitizedReceiptNumber = fee.receiptNumber ? sanitizeInput(fee.receiptNumber) : null;
    
    const { data, error } = await supabase
      .from('fees')
      .insert([{
        student_id: fee.studentId,
        amount: fee.amount,
        due_date: fee.dueDate,
        status: fee.status,
        payment_date: fee.paymentDate || null,
        payment_method: sanitizedPaymentMethod,
        receipt_number: sanitizedReceiptNumber
      }])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating fee:', error);
    return { data: null, error };
  }
}

/**
 * Update an existing fee
 */
export async function updateFee(id: string, fee: Partial<Fee>) {
  try {
    const updateData: Record<string, any> = {};
    
    if (fee.studentId) updateData.student_id = fee.studentId;
    if (fee.amount !== undefined) updateData.amount = fee.amount;
    if (fee.dueDate) updateData.due_date = fee.dueDate;
    if (fee.status) updateData.status = fee.status;
    if (fee.paymentDate !== undefined) updateData.payment_date = fee.paymentDate || null;
    if (fee.paymentMethod !== undefined) {
      updateData.payment_method = fee.paymentMethod ? sanitizeInput(fee.paymentMethod) : null;
    }
    if (fee.receiptNumber !== undefined) {
      updateData.receipt_number = fee.receiptNumber ? sanitizeInput(fee.receiptNumber) : null;
    }
    
    const { data, error } = await supabase
      .from('fees')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating fee:', error);
    return { data: null, error };
  }
}

/**
 * Delete a fee
 */
export async function deleteFee(id: string) {
  try {
    const { error } = await supabase
      .from('fees')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting fee:', error);
    return { error };
  }
}

/**
 * Mark a fee as paid
 */
export async function markFeeAsPaid(id: string, paymentMethod: string, receiptNumber?: string) {
  try {
    const sanitizedPaymentMethod = sanitizeInput(paymentMethod);
    const sanitizedReceiptNumber = receiptNumber ? sanitizeInput(receiptNumber) : null;
    
    const { data, error } = await supabase
      .from('fees')
      .update({
        status: 'paid',
        payment_date: new Date(),
        payment_method: sanitizedPaymentMethod,
        receipt_number: sanitizedReceiptNumber
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error marking fee as paid:', error);
    return { data: null, error };
  }
}

/**
 * Get fee statistics
 */
export async function getFeeStatistics() {
  try {
    const { data, error } = await supabase
      .from('fees')
      .select('amount, status');
      
    if (error) throw error;
    
    const totalFees = data.length;
    const totalAmount = data.reduce((sum, fee) => sum + fee.amount, 0);
    
    const paidFees = data.filter(fee => fee.status === 'paid');
    const pendingFees = data.filter(fee => fee.status === 'pending');
    const overdueFees = data.filter(fee => fee.status === 'overdue');
    
    const paidAmount = paidFees.reduce((sum, fee) => sum + fee.amount, 0);
    const pendingAmount = pendingFees.reduce((sum, fee) => sum + fee.amount, 0);
    const overdueAmount = overdueFees.reduce((sum, fee) => sum + fee.amount, 0);
    
    const stats = {
      totalFees,
      totalAmount,
      paidFees: paidFees.length,
      pendingFees: pendingFees.length,
      overdueFees: overdueFees.length,
      paidAmount,
      pendingAmount,
      overdueAmount,
      collectionRate: totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0
    };
    
    return { data: stats, error: null };
  } catch (error) {
    console.error('Error getting fee statistics:', error);
    return { data: null, error };
  }
}

/**
 * Get student fee summary
 */
export async function getStudentFeeSummary(studentId: string) {
  try {
    const { data, error } = await supabase
      .from('fees')
      .select('amount, status')
      .eq('student_id', studentId);
      
    if (error) throw error;
    
    const totalFees = data.length;
    const totalAmount = data.reduce((sum, fee) => sum + fee.amount, 0);
    
    const paidFees = data.filter(fee => fee.status === 'paid');
    const pendingFees = data.filter(fee => fee.status === 'pending');
    const overdueFees = data.filter(fee => fee.status === 'overdue');
    
    const paidAmount = paidFees.reduce((sum, fee) => sum + fee.amount, 0);
    const pendingAmount = pendingFees.reduce((sum, fee) => sum + fee.amount, 0);
    const overdueAmount = overdueFees.reduce((sum, fee) => sum + fee.amount, 0);
    
    const summary = {
      totalFees,
      totalAmount,
      paidFees: paidFees.length,
      pendingFees: pendingFees.length,
      overdueFees: overdueFees.length,
      paidAmount,
      pendingAmount,
      overdueAmount,
      paymentRate: totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0
    };
    
    return { data: summary, error: null };
  } catch (error) {
    console.error('Error getting student fee summary:', error);
    return { data: null, error };
  }
}
