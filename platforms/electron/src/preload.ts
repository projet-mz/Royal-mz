import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  auth: {
    signIn: (email: string, password: string) => ipcRenderer.invoke('auth:signIn', email, password),
    signOut: () => ipcRenderer.invoke('auth:signOut'),
    getUser: () => ipcRenderer.invoke('auth:getUser')
  },
  security: {
    getCheckpoints: () => ipcRenderer.invoke('security:getCheckpoints'),
    getSecurityDashboardStats: () => ipcRenderer.invoke('security:getSecurityDashboardStats'),
    getStudentCurrentStatus: (studentId: string) => ipcRenderer.invoke('security:getStudentCurrentStatus', studentId)
  }
});
