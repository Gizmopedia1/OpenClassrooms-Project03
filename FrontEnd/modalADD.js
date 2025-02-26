const buttons = document.querySelectorAll(".boutonPoubelle");
    
buttons.forEach(button => {
    button.addEventListener('click', async (event) => {
        const id = event.target.dataset.id;

        try {
            const response = await fetch (`http://localhost:5678/api/works/${id}`, {
                method: "DELETE",
                headers: {
                    headers: {"Content-Type": "application/json"},
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            
            if (response.ok) {
                
                const response = await fetch("http://localhost:5678/api/works")
                const objets = await response.json();
                document.getElementById("modal-gallery").innerHTML = ""
                genererObjetsmodal(objets);
                document.getElementById("gallery").innerHTML = ""
                genererObjets(objets);

          
            } else {
                console.log('Erreur lors de la suppression.');
            }
        } catch (error) {
            console.error('Erreur:', error);
        }
    });
});