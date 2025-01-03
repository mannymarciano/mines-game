// Preload audio files
const gemSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.wav');
const rubySound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-retro-arcade-game-over-470.wav');

export function playGameSound(type: 'gem' | 'ruby') {
  const audio = type === 'gem' ? gemSound : rubySound;
  
  // Reset the audio to start
  audio.currentTime = 0;
  
  // Play the sound with error handling
  audio.play().catch(error => {
    console.error('Error playing sound:', error);
  });
}