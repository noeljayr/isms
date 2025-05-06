export function generatePassword(): string {
    let length: number = 7
    const numbers = '0123456789';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const special = '!@#$%^&*()-_=+[]{}|;:,.<>?';
  
    // Ensure at least one character from each required set
    const requiredChars = [
      numbers[Math.floor(Math.random() * numbers.length)],
      lowercase[Math.floor(Math.random() * lowercase.length)],
      uppercase[Math.floor(Math.random() * uppercase.length)],
      special[Math.floor(Math.random() * special.length)],
    ];
  
    // Combine all character sets for the remaining characters
    const allChars = numbers + lowercase + uppercase + special;
    const remainingLength = length - requiredChars.length;
    for (let i = 0; i < remainingLength; i++) {
      requiredChars.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }
  
    // Shuffle the array using Fisher-Yates
    for (let i = requiredChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [requiredChars[i], requiredChars[j]] = [requiredChars[j], requiredChars[i]];
    }
  
    return requiredChars.join('');
  }
  
  