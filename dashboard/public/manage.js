// ========================================
// 🥞 Manage Server
// ========================================


const params = new URLSearchParams(

    window.location.search

);


const guildId = params.get("id");








// ========================================
// 👋 Guardar Welcome
// ========================================


async function saveWelcome(){



    const message =

    document.getElementById(

        "welcomeMessage"

    ).value;




    const image =

    document.getElementById(

        "welcomeImage"

    ).value;






    const res = await fetch(

        `/api/settings/${guildId}`,

        {


            method:"POST",


            headers:{


                "Content-Type":"application/json"


            },


            body:JSON.stringify({


                welcomeMessage:message,


                welcomeImage:image


            })


        }

    );






    const data = await res.json();





    if(data.success){


        alert(

            "✅ Configuración guardada"

        );


    }



}









// ========================================
// 🎭 AutoRole Selector
// ========================================


async function loadRoles(){


    const response = await fetch(

        `http://localhost:3001/api/roles/${guildId}`

    );


    const roles = await response.json();




    const select =

    document.getElementById(

        "autoRole"

    );




    select.innerHTML = "";






    roles.forEach(role=>{


        const option =

        document.createElement(

            "option"

        );



        option.value = role.id;


        option.textContent = role.name;



        select.appendChild(option);



    });



}







loadRoles();








// ========================================
// 🎭 Guardar AutoRole
// ========================================


async function saveAutoRole(){



    const roleId = 

    document.getElementById(

        "autoRole"

    ).value;







    const response = await fetch(


        `/api/settings/${guildId}`,


        {


            method:"POST",


            headers:{


                "Content-Type":"application/json"


            },


            body:JSON.stringify({


                autoRoleId:roleId


            })


        }


    );







    const data = await response.json();






    if(data.success){


        alert(

            "🎭 AutoRole guardado"

        );


    }else{


        alert(

            "❌ Error guardando AutoRole"

        );


    }



}