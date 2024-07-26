// script.js
import teamMembers from '../data/dataTeam';

const createHTMLElement = (type, attributes = {}) => {
    const element = document.createElement(type);
    Object.entries(attributes).forEach(([key, value]) => {
        element[key] = value;
    });
    return element;
};

const generateTeamMemberCard = (member) => {
    const card = createHTMLElement('div', {
        className: 'card',
        style: 'width: 20rem; border-width: 0px; box-shadow: 10px 10px 40px -12px rgba(0,0,0,0.75); border-radius: 3%;',
    });

    const img = createHTMLElement('img', {
        className: 'card-img-top p-3',
        src: member.image,
        alt: '...',
        style: 'object-fit: cover; border-radius: 10%; height:280px;',
    });

    const cardBody = createHTMLElement('div', { className: 'card-body text-center' });

    const title = createHTMLElement('h5', {
        className: 'card-title text-center',
        style: 'color: #1ab15b;',
        textContent: member.name,
    });

    const id = createHTMLElement('p', {
        className: 'card-text',
        textContent: `ID: ${member.id}`,
    });

    const role = createHTMLElement('p', {
        className: 'card-text',
        textContent: `Sebagai: ${member.role}`,
    });

    const socialLinks = createHTMLElement('div', { className: 'text-center' });

    // Social media links
    ['github', 'instagram', 'linkedin'].forEach((socialMedia) => {
        const link = createHTMLElement('a', { href: member[socialMedia], target: '_blank' });
        const image = createHTMLElement('img', {
            src: `./image/${socialMedia}.png`,
            style: 'width:25px; margin-right:5px;',

        });
        link.appendChild(image);
        socialLinks.appendChild(link);
    });

    // Append elements to the card
    cardBody.append(title, id, role, socialLinks);
    card.append(img, cardBody);

    return card;
};

const generateTeamMemberCards = () => {
    const teamMembersContainer = document.getElementById('teamMembersContainer');
    teamMembers.forEach((member) => {
        const card = generateTeamMemberCard(member);
        teamMembersContainer.appendChild(card);
    });
};

export default generateTeamMemberCards;
