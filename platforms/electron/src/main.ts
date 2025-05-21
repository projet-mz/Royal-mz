import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { createSupabaseClient, AuthService, SecurityPortalService } from '@royal-mz/shared';

let mainWindow: BrowserWindow | null = null;

const supabaseUrl = process.env.SUPABASE_URL || 'https://yjpgggnltnomvvvugoni.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqcGdnZ25sdG5vbXZ2dnVnb25pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3ODk3OTMsImV4cCI6MjA2MzM2NTc5M30.ObQvX1RHa31OvxinqkWFmduuv_uo4UgPntjmeZx-I5M';

const supabase = createSupabaseClient(supabaseUrl, supabaseKey);
const authService = new AuthService(supabase);
const securityService = new SecurityPortalService(supabase);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle('auth:signIn', async (_, email, password) => {
  return await authService.signIn(email, password);
});

ipcMain.handle('auth:signOut', async () => {
  return await authService.signOut();
});

ipcMain.handle('auth:getUser', async () => {
  return await authService.getUser();
});

ipcMain.handle('security:getCheckpoints', async () => {
  return await securityService.getSecurityCheckpoints();
});

ipcMain.handle('security:getSecurityDashboardStats', async () => {
  return await securityService.getSecurityDashboardStats();
});

ipcMain.handle('security:getStudentCurrentStatus', async (_, studentId) => {
  return await securityService.getStudentCurrentStatus(studentId);
});
