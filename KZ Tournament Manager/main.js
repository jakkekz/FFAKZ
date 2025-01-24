const jakkeText = document.querySelector('span');
const jakkeLink = document.getElementById('jakke-link');
const imageOverlay = document.getElementById('image-overlay');
const popup = document.createElement('div');

// Add an ID to the popup for easier styling
popup.id = 'popup';

// Create links for Steam, Discord, and GitHub
const links = [
  {
    href: 'https://steamcommunity.com/id/Pierre_Bourne/',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/steam.svg',
    alt: 'Steam',
  },
  {
    href: 'https://discordapp.com/users/357991779930210326',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg',
    alt: 'Discord',
  },
  {
    href: 'https://github.com/jakkekz/KZTournamentManager',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
    alt: 'GitHub',
  },
];

links.forEach((link) => {
  const a = document.createElement('a');
  a.href = link.href;
  a.target = '_blank';
  a.innerHTML = `<img src="${link.icon}" alt="${link.alt}" style="width: 24px; height: 24px; filter: invert(1);">`;
  popup.appendChild(a);
});

document.body.appendChild(popup);

jakkeLink.addEventListener('click', (event) => {
  event.preventDefault();
  toggleOverlayAndPopup();
});

// Function to toggle overlay and popup
function toggleOverlayAndPopup() {
  // Toggle the image overlay with smooth transition
  imageOverlay.classList.toggle('active');

  // Toggle the popup visibility and link interactivity
  popup.classList.toggle('active');
  links.forEach((link) => {
    const a = popup.querySelector(`a[href="${link.href}"]`);
    a.classList.toggle('active');
  });
}

// Close overlay and popup when clicking anywhere on the document
document.addEventListener('click', (event) => {
  if (event.target !== jakkeLink && !imageOverlay.contains(event.target) && !popup.contains(event.target)) {
    imageOverlay.classList.remove('active');
    popup.classList.remove('active');
    links.forEach((link) => {
      const a = popup.querySelector(`a[href="${link.href}"]`);
      a.classList.remove('active');
    });
  }a
});