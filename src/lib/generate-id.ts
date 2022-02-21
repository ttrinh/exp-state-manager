/**
 * Sluggify a string.
 */
export const sluggify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with separator
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/_+/g, '-') // Replace all '_' with '-'
    .replace(/--+/g, '-') // Replace multiple '-' with single '-'
    .replace(/^-+/, '') // Trim '-' from start of text
    .replace(/-+$/, ''); // Trim '-' from end of text

/**
 * Generate a random ID.
 *
 * @param prefix Will be sluggified.
 * @param length How long should the random portion be.
 */
export const generateId = (prefix: string, length: number = 6) =>
  `${sluggify(prefix)}-${Math.random()
    .toString(36)
    .substring(2, length + 2)}`;
