// Share functionality utilities

export interface ShareData {
  title: string;
  text: string;
  url?: string;
}

export async function shareArticle(shareData: ShareData): Promise<boolean> {
  // Check if Web Share API is supported
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
      return false;
    }
  }
  
  // Fallback to clipboard
  return fallbackShare(shareData);
}

async function fallbackShare(shareData: ShareData): Promise<boolean> {
  try {
    const shareText = `${shareData.title}\n\n${shareData.text}${shareData.url ? `\n\n${shareData.url}` : ''}`;
    
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    }
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
}

export function canShare(): boolean {
  return typeof navigator !== 'undefined' && !!navigator.share;
}