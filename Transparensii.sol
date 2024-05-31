// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarbonEmissions {
    address public ownerOfContract;

    struct Company {
        string name;
        uint256 totalEmissions;
        Combustibles combustibles;
        Electricite electricite;
        Halocarbures halocarbures;
        EauxUsees eauxUsees;
        Intrants intrants;
        Dechets dechets;
        Deboisement deboisement;
        Expedition expedition;
        Deplacements deplacements;
    }

    struct Combustibles {
        uint256 fossilesSourcesFixes;
        uint256 fossilesSourcesMobiles;
        uint256 productionElectriciteCombustiblesSourcesFixes;
        uint256 chauffageFossile;
        uint256 explosifs;
    }

    struct Electricite {
        uint256 fournisseur;
        uint256 pertesEnLigne;
    }

    struct Halocarbures {
        uint256 climatisation;
        uint256 transportElectricite;
    }

    struct EauxUsees {
        uint256 traitement;
    }

    struct Intrants {
        uint256 metaux;
        uint256 produitsChimiques;
        uint256 plastiques;
        uint256 hydrogene;
    }

    struct Dechets {
        uint256 matiereOrganique;
        uint256 autresMateriaux;
    }

    struct Deboisement {
        uint256 perteStocks;
        uint256 perteSequestration;
    }

    struct Expedition {
        uint256 fluxRoutier;
        uint256 fluxFerroviaire;
        uint256 fluxMaritime;
    }

    struct Deplacements {
        uint256 domicileTravail;
        uint256 travail;
    }

    mapping(address => Company) public companies;

    modifier onlyOwner() {
        require(
            msg.sender == ownerOfContract,
            "Only the contract owner can perform this action"
        );
        _;
    }

    function registerCompany(string memory _name) public {
        companies[msg.sender] = Company(
            _name,
            0,
            Combustibles(0, 0, 0, 0, 0),
            Electricite(0, 0),
            Halocarbures(0, 0),
            EauxUsees(0),
            Intrants(0, 0, 0, 0),
            Dechets(0, 0),
            Deboisement(0, 0),
            Expedition(0, 0, 0),
            Deplacements(0, 0)
        );
    }

    // Combustibles
    function addCombustiblesFossilesSourcesFixes(
        uint256 quantity,
        uint256 factor
    ) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].combustibles.fossilesSourcesFixes += emissions;
        updateTotalEmissions(emissions);
    }

    function addCombustiblesFossilesSourcesMobiles(
        uint256 quantity,
        uint256 factor
    ) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].combustibles.fossilesSourcesMobiles += emissions;
        updateTotalEmissions(emissions);
    }

    function addProductionElectriciteCombustiblesSourcesFixes(
        uint256 quantity,
        uint256 factor
    ) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender]
            .combustibles
            .productionElectriciteCombustiblesSourcesFixes += emissions;
        updateTotalEmissions(emissions);
    }

    function addChauffageFossile(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].combustibles.chauffageFossile += emissions;
        updateTotalEmissions(emissions);
    }

    function addExplosifs(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].combustibles.explosifs += emissions;
        updateTotalEmissions(emissions);
    }

    // Electricité
    function addFournisseur(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].electricite.fournisseur += emissions;
        updateTotalEmissions(emissions);
    }

    function addPertesEnLigne(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].electricite.pertesEnLigne += emissions;
        updateTotalEmissions(emissions);
    }

    // Halocarbures
    function addClimatisation(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].halocarbures.climatisation += emissions;
        updateTotalEmissions(emissions);
    }

    function addTransportElectricite(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].halocarbures.transportElectricite += emissions;
        updateTotalEmissions(emissions);
    }

    // Eaux Usées
    function addTraitementEauxUsees(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].eauxUsees.traitement += emissions;
        updateTotalEmissions(emissions);
    }

    // Intrants
    function addMetaux(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].intrants.metaux += emissions;
        updateTotalEmissions(emissions);
    }

    function addProduitsChimiques(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].intrants.produitsChimiques += emissions;
        updateTotalEmissions(emissions);
    }

    function addPlastiques(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].intrants.plastiques += emissions;
        updateTotalEmissions(emissions);
    }

    function addHydrogene(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].intrants.hydrogene += emissions;
        updateTotalEmissions(emissions);
    }

    // Déchets
    function addMatiereOrganique(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].dechets.matiereOrganique += emissions;
        updateTotalEmissions(emissions);
    }

    function addAutresMateriaux(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].dechets.autresMateriaux += emissions;
        updateTotalEmissions(emissions);
    }

    // Déboisement
    function addPerteStocks(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].deboisement.perteStocks += emissions;
        updateTotalEmissions(emissions);
    }

    function addPerteSequestration(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].deboisement.perteSequestration += emissions;
        updateTotalEmissions(emissions);
    }

    // Expédition
    function addFluxRoutier(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].expedition.fluxRoutier += emissions;
        updateTotalEmissions(emissions);
    }

    function addFluxFerroviaire(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].expedition.fluxFerroviaire += emissions;
        updateTotalEmissions(emissions);
    }

    function addFluxMaritime(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].expedition.fluxMaritime += emissions;
        updateTotalEmissions(emissions);
    }

    // Déplacements
    function addDomicileTravail(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].deplacements.domicileTravail += emissions;
        updateTotalEmissions(emissions);
    }

    function addTravail(uint256 quantity, uint256 factor) public {
        uint256 emissions = calculateEmissions(quantity, factor);
        companies[msg.sender].deplacements.travail += emissions;
        updateTotalEmissions(emissions);
    }

    function calculateEmissions(
        uint256 quantity,
        uint256 factor
    ) private pure returns (uint256) {
        return quantity * factor;
    }

    function updateTotalEmissions(uint256 emissions) private {
        companies[msg.sender].totalEmissions += emissions;
    }

    function getTotalEmissions(address _company) public view returns (uint256) {
        return companies[_company].totalEmissions;
    }
}
