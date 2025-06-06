const tableauLettres = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    const liste_mots = ["ARBRE", "NUAGE", "SOLEIL", "LUNE", "VOITURE", "TRAIN", "PLUIE", "NEIGE", "ROUTE", "POMME", "MAISON", "JARDIN", "SOURIS", "CHIEN", "CHAT", "FLEUR", "BATEAU", "MERCI", "VIOLET", "BLEU", "RIVIERE", "FORET", "SABLE", "VENT", "ORAGE", "ETOILE", "MONTAGNE", "PIERRE", "COEUR", "AMOUR", "PAPIER", "ECRAN", "TABLE", "CRAYON", "CAHIER", "ECOUTER", "REGARD", "SAVON", "VESTE", "CHAIR", "BONBON", "LIVRE", "FEUILLU", "MOTEUR", "CROISSANT", "VELO", "COQUILLAGE", "LAMPE", "BULLE", "FANTOME"];

    const lettreDiv = document.getElementById("lettres");
    const devineMotDiv = document.getElementById("devine_mot");
    const boutonRejouerDiv = document.getElementById("bouton-rejouer");

    let mot_a_rechercher = '';
    let mot_utilisateur = [];
    let nbr_tentatives = 6;

    function init() {
        nbr_tentatives = 6;
        mot_a_rechercher = '';
        mot_utilisateur = [];

        creer_mot_a_rechercher();
        creer_lettres_alphabet();
        afficher_mot_utilisateur();
        creer_bouton_rejouer();
        afficher_pendu_erreur(0);
    }

    function creer_mot_a_rechercher() {
        const indexAleatoire = Math.floor(Math.random() * liste_mots.length);
        mot_a_rechercher = liste_mots[indexAleatoire];
        mot_utilisateur = Array(mot_a_rechercher.length).fill('_');
    }

    function creer_lettres_alphabet() {
        lettreDiv.innerHTML = '';

        tableauLettres.forEach(lettre => {
            const btn = document.createElement("button");
            btn.innerText = lettre;
            btn.classList.add("lettre-bouton");
            btn.addEventListener("click", () => {
                verifier_lettre(lettre);
                btn.disabled = true;
                btn.style.backgroundColor = "#4d4f51";
                btn.style.color = "#777";
            });
            lettreDiv.appendChild(btn);
        });
    }

    function afficher_mot_utilisateur() {
        devineMotDiv.innerText = mot_utilisateur.join(' ');
    }

    function verifier_lettre(lettreCliquee) {
        let correct = false;

        for (let i = 0; i < mot_a_rechercher.length; i++) {
            if (mot_a_rechercher[i] === lettreCliquee) {
                mot_utilisateur[i] = lettreCliquee;
                correct = true;
            }
        }

        if (!correct) {
            nbr_tentatives--;
            afficher_pendu_erreur(6 - nbr_tentatives);
        }

        afficher_mot_utilisateur();

        if (!mot_utilisateur.includes('_')) {
            alert("🎉 Bravo, tu as trouvé le mot !");
            desactiver_tous_les_boutons();
        }

        if (nbr_tentatives <= 0) {
            alert(`💀 Partie terminée ! Le mot était : ${mot_a_rechercher}`);
            desactiver_tous_les_boutons();
        }
    }

    function desactiver_tous_les_boutons() {
        const boutons = lettreDiv.querySelectorAll('button');
        boutons.forEach(btn => {
            btn.disabled = true;
            btn.style.backgroundColor = "#4d4f51";
            btn.style.color = "#aaa";
        });
    }

    function creer_bouton_rejouer() {
        boutonRejouerDiv.innerHTML = '';
        const btn = document.createElement('button');
        btn.innerText = "Rejouer";
        btn.style.marginTop = "20px";
        btn.style.padding = "10px 20px";
        btn.style.fontSize = "16px";
        btn.style.cursor = "pointer";
        btn.addEventListener('click', () => init());
        boutonRejouerDiv.appendChild(btn);
    }

    function afficher_pendu_erreur(erreurs) {
        const parties = ["tete", "corps", "bras-gauche", "bras-droit", "jambe-gauche", "jambe-droit"];
        parties.forEach(partie => document.getElementById(partie).style.visibility = "hidden");
        for (let i = 0; i < erreurs; i++) {
            document.getElementById(parties[i]).style.visibility = "visible";
        }
    }

    init();