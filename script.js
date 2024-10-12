document.getElementById('username-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    await fetchProfile(username);
});

async function fetchProfile(username) {
    const profileDiv = document.getElementById('profile');
    profileDiv.innerHTML = ''; // Clear previous profile

    try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error('User not found');

        const userData = await userResponse.json();
        const reposResponse = await fetch(userData.repos_url);
        const reposData = await reposResponse.json();

        displayProfile(userData, reposData);
    } catch (error) {
        profileDiv.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayProfile(userData, reposData) {
    const profileDiv = document.getElementById('profile');
    
    const profileHTML = `
        <h2>${userData.login}</h2>
        <img src="${userData.avatar_url}" alt="${userData.login}" width="150">
        <p><strong>Followers:</strong> ${userData.followers}</p>
        <p><strong>Public Repositories:</strong> ${userData.public_repos}</p>
        <div class="repos">
            <h3>Repositories:</h3>
            <ul>
                ${reposData.map(repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`).join('')}
            </ul>
        </div>
    `;
    
    profileDiv.innerHTML = profileHTML;
}
