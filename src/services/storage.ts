import { supabase } from '../lib/supabase/client';
import { encryptData } from './security';

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(bucket: string, path: string, file: File, isPublic: boolean = false) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type
      });
      
    if (error) throw error;
    
    if (isPublic) {
      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
      return { 
        data: {
          ...data,
          url: urlData.publicUrl
        }, 
        error: null 
      };
    } else {
      const { data: urlData } = await supabase.storage.from(bucket).createSignedUrl(path, 3600); // 1 hour expiry
      return { 
        data: {
          ...data,
          url: urlData?.signedUrl || ''
        }, 
        error: null 
      };
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return { data: null, error };
  }
}

/**
 * Get a file URL from Supabase Storage
 */
export async function getFileUrl(bucket: string, path: string, isPublic: boolean = false) {
  try {
    if (isPublic) {
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      return { 
        data: {
          url: data.publicUrl
        }, 
        error: null 
      };
    } else {
      const { data } = await supabase.storage.from(bucket).createSignedUrl(path, 3600); // 1 hour expiry
      return { 
        data: {
          url: data?.signedUrl || ''
        }, 
        error: null 
      };
    }
  } catch (error) {
    console.error('Error getting file URL:', error);
    return { data: null, error };
  }
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(bucket: string, path: string) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([path]);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { data: null, error };
  }
}

/**
 * Upload a user avatar
 */
export async function uploadAvatar(userId: string, file: File) {
  try {
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/avatar.${fileExt}`;
    
    const { data, error } = await uploadFile('avatars', filePath, file, true);
    
    if (error) throw error;
    
    if (data && data.url) {
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          avatar: data.url,
          updated_at: new Date()
        })
        .eq('id', userId);
        
      if (updateError) throw updateError;
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return { data: null, error };
  }
}

/**
 * Upload a document with encryption for sensitive files
 */
export async function uploadEncryptedDocument(bucket: string, path: string, file: File, encryptionKey: string) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);
    
    const fileString = new TextDecoder().decode(fileData);
    
    const encryptedData = await encryptData(fileString, encryptionKey);
    
    const encryptedFile = new File([encryptedData], file.name, { type: file.type });
    
    const { data, error } = await uploadFile(bucket, path, encryptedFile, false);
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error uploading encrypted document:', error);
    return { data: null, error };
  }
}

/**
 * List files in a bucket
 */
export async function listFiles(bucket: string, path: string = '') {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error listing files:', error);
    return { data: null, error };
  }
}

/**
 * Create a folder in a bucket
 */
export async function createFolder(bucket: string, path: string) {
  try {
    const emptyFile = new File([], '.folder');
    const folderPath = path.endsWith('/') ? `${path}.folder` : `${path}/.folder`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(folderPath, emptyFile);
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating folder:', error);
    return { data: null, error };
  }
}
