// Bookmark management utilities using cookies

export interface Bookmark {
  id: string;
  headline: string;
  timestamp: number;
}

const BOOKMARK_COOKIE = 'bookmarked_articles';

export function getBookmarks(): Bookmark[] {
  if (typeof document === 'undefined') return [];
  
  try {
    const cookies = document.cookie.split(';');
    const bookmarkCookie = cookies.find(cookie => 
      cookie.trim().startsWith(`${BOOKMARK_COOKIE}=`)
    );
    
    if (!bookmarkCookie) return [];
    
    const bookmarkData = decodeURIComponent(bookmarkCookie.split('=')[1]);
    return JSON.parse(bookmarkData);
  } catch (error) {
    console.error('Error parsing bookmarks:', error);
    return [];
  }
}

export function addBookmark(articleId: string, headline: string): void {
  if (typeof document === 'undefined') return;
  
  const bookmarks = getBookmarks();
  const existingBookmark = bookmarks.find(bookmark => bookmark.id === articleId);
  
  if (!existingBookmark) {
    const newBookmark: Bookmark = {
      id: articleId,
      headline,
      timestamp: Date.now()
    };
    
    bookmarks.push(newBookmark);
    saveBookmarks(bookmarks);
  }
}

export function removeBookmark(articleId: string): void {
  if (typeof document === 'undefined') return;
  
  const bookmarks = getBookmarks().filter(bookmark => bookmark.id !== articleId);
  saveBookmarks(bookmarks);
}

export function isBookmarked(articleId: string): boolean {
  const bookmarks = getBookmarks();
  return bookmarks.some(bookmark => bookmark.id === articleId);
}

function saveBookmarks(bookmarks: Bookmark[]): void {
  if (typeof document === 'undefined') return;
  
  const bookmarkData = JSON.stringify(bookmarks);
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1); // 1 year expiry
  
  document.cookie = `${BOOKMARK_COOKIE}=${encodeURIComponent(bookmarkData)}; expires=${expires.toUTCString()}; path=/`;
}