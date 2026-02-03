/**
 * Artwork Data
 * Mock data for the portfolio.
 */
export const artworks = [
    {
        id: 1,
        title: "Yaagyaseni Draupadi 🔥❤🙏🏻",
        medium: "Pencil Sketch",
        image: "images/img1.jpg",
        year: "June 2022"
    },
    {
        id: 2,
        title: "Radha Krishna 🦚🪈",
        medium: "watercolor painting",
        image: "images/img2.jpg",
        year: "August, 2024"
    },
    {
        id: 3,
        title: "Coffe~Couple ☕❤️",
        medium: "Pencil Sketch",
        image: "images/img3.jpg",
        year: "June, 2024"
    },
    {
        id: 4,
        title: "SLB aesthetics 🤌🏻✨",
        medium: "Watercolor",
        image: "images/img4.jpg",
        year: "May, 2024"
    },
    {
        id: 5,
        title: "The KING of VOICE THE ARIJIT SINGH 🎙️🎶✨",
        medium: "Graphite Pencil Sketch",
        image: "images/img5.jpg",
        year: "April, 2024"
    },
    {
        id: 6,
        title: "Darling 😻",
        medium: "Pencil Sketch",
        image: "images/img6.jpg",
        year: "June, 2021"
    }
];

/**
 * Renders the artwork card HTML.
 * @param {Object} art - The artwork object.
 * @returns {string} HTML string for the card.
 */
export function createArtworkCard(art) {
    return `
        <article class="artwork-card" data-id="${art.id}">
            <div class="artwork-image-wrapper parallax-wrapper">
                <img src="${art.image}" alt="${art.title}" loading="lazy" class="parallax-img">
            </div>
            <div class="artwork-info">
                <h3 class="artwork-title">${art.title}</h3>
                <p class="artwork-medium">${art.medium}, ${art.year}</p>
            </div>
        </article>
    `;
}
