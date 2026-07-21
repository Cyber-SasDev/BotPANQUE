// ========================================
// 🥞 BotPANQUE Dashboard
// Frontend
// ========================================



async function loadUser(){


const res = await fetch("/api/user");


const data = await res.json();



if(!data.logged){


    location.href="/";

    return;

}




document.getElementById("user").innerHTML = `


<img

src="https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png"

width="90"

style="border-radius:50%"


>


<h2>

👤 ${data.username}

</h2>


`;



}







async function loadGuilds(){



const res = await fetch("/api/guilds");


const guilds = await res.json();




const box = document.getElementById("servers");



if(guilds.length === 0){


box.innerHTML =

"❌ No se encontraron servidores";


return;


}





box.innerHTML = guilds.map(g=>`



<div class="server-card">


<h3>

🌎 ${g.name}

</h3>


<button onclick="manageServer('${g.id}')">

⚙️ Administrar

</button>


</div>



`).join("");



}






loadUser();

loadGuilds();

function manageServer(id){

    window.location.href =
    `/manage.html?id=${id}`;

}