// ═══════════════════════════════════════════════════════════════
//  SPECIES ENCYCLOPEDIA — Xenobiology Field Guide
//  Planet Veridion-7 Ecosystem Survey, Cycle 4.015
//  26 Documented Species across 5 Biomes
// ═══════════════════════════════════════════════════════════════

var SPECIES_LORE = {

  // ══════════════════════════════════════════
  //  GRASSLAND (B0) — The Luminous Steppe
  // ══════════════════════════════════════════

  'prey-0': {
    name: 'Grazer',
    sciName: 'Pascuum robustus',
    type: 'Prey',
    biome: 'Grassland',
    tagline: 'The armored ruminant of the luminous steppe',
    desc: 'The Grazer is a stocky, barrel-chested quadruped covered in overlapping keratin plates that shimmer with a faint green bioluminescence at dusk. Its wide, flat teeth are adapted for grinding the silicon-rich prairie grasses of the Luminous Steppe, extracting nutrients that would be toxic to most other herbivores. Grazers move in loose herds of 8\u201320 individuals, their heavy footfalls creating a low-frequency rumble that communicates herd position across kilometers of open terrain. When threatened, they form a defensive ring with calves at the center, presenting their armored flanks outward.',
    weight: '8\u201318 kg (avg 12 kg)',
    length: '50\u201375 cm body',
    height: '30\u201342 cm shoulder',
    lifespan: '6\u201311 years (max observed: 14)',
    diet: 'Bioluminescent prairie grasses, root tubers, mineral-rich soil deposits',
    behavior: 'Crepuscular grazing patterns. Herds rotate between feeding grounds on a 3-day cycle to prevent overgrazing. Dominant females lead migration. Males spar by locking head-plates during mating season.',
    adaptation: 'Keratin plate armor reflects UV radiation. Specialized gut bacteria break down silicon compounds. Infrasonic communication through ground vibrations.',
    status: 'Abundant \u2014 keystone herbivore species'
  },

  'prey-1': {
    name: 'Hopper',
    sciName: 'Saltipes velox',
    type: 'Prey',
    biome: 'Grassland',
    tagline: 'The spring-loaded escape artist',
    desc: 'Built for explosive acceleration, the Hopper possesses elongated hind limbs with a unique double-jointed ankle that stores elastic energy like a biological spring. Its oversized ears, rich with blood vessels, serve dual purposes: thermoregulation under the open steppe sun and acute directional hearing capable of detecting a predator\'s footfall at 200 meters. The Hopper\'s fur shifts from tawny gold in dry season to pale silver during the brief frost months, providing year-round camouflage. They are solitary except during the synchronized breeding event known as the "Spring Chorus," when hundreds gather in shallow depressions to mate.',
    weight: '2\u20135 kg (avg 3.2 kg)',
    length: '25\u201340 cm body + 15 cm ears',
    height: '20\u201330 cm (standing)',
    lifespan: '3\u20137 years (max observed: 9)',
    diet: 'Seed heads, flower buds, underground fungi, occasional insects',
    behavior: 'Solitary and territorial. Marks territory with scent glands on hind feet. Can leap 3 meters vertically from standing. Freezes motionless when aerial predators detected, relying on camouflage.',
    adaptation: 'Double-jointed ankles store 4x body energy for explosive leaps. Ear vasculature can dump body heat in 90 seconds. Dichromatic seasonal fur change.',
    status: 'Common \u2014 primary prey for Plains Stalker'
  },

  'prey-2': {
    name: 'Burrower',
    sciName: 'Fossomys cryptus',
    type: 'Prey',
    biome: 'Grassland',
    tagline: 'The subterranean architect',
    desc: 'Rarely seen on the surface, the Burrower spends 90% of its life in elaborate tunnel networks that can extend 50 meters in diameter and three levels deep. Its forelimbs are equipped with hardened calcium-carbonate claws that can excavate compacted clay at remarkable speed. Virtually blind, the Burrower navigates by sensing vibrations through specialized mechanoreceptors along its jawline \u2014 effectively "seeing" the underground world through seismic imaging. Its smooth, velvety pelt can lie flat in any direction, allowing the animal to reverse through tunnels without resistance.',
    weight: '1\u20133 kg (avg 1.8 kg)',
    length: '18\u201328 cm',
    height: '12\u201318 cm',
    lifespan: '4\u20138 years (max observed: 12)',
    diet: 'Root systems, soil invertebrates, underground fungal mats, tuber caches',
    behavior: 'Colonial. Tunnel systems house 5\u201315 individuals with shared nursery chambers. Sentries post near surface exits and thump warnings. Hoards food in dedicated pantry chambers during abundance.',
    adaptation: 'Seismic-sensing jaw mechanoreceptors replace vision. Calcium-carbonate claws self-sharpen through use. Hemoglobin has 3x oxygen affinity for low-O2 tunnel living. Reversible fur direction.',
    status: 'Common \u2014 tunnel systems are ecosystem engineers'
  },

  'prey-3': {
    name: 'Seedling',
    sciName: 'Seminova dispersa',
    type: 'Prey',
    biome: 'Grassland',
    tagline: 'The tiny gardener of the plains',
    desc: 'The smallest vertebrate on the Luminous Steppe, the Seedling is a delicate, mouse-like creature with an outsized ecological role. Its cheek pouches, which can expand to 3x head volume, are lined with a mildly adhesive mucus that collects plant seeds during foraging. As the Seedling moves between feeding sites, it inadvertently plants hundreds of seeds daily, making it the primary dispersal agent for over 40 grass species. Its tail is prehensile and tipped with a small sensory pad that detects air pressure changes \u2014 an early-warning system for approaching storms and large predators.',
    weight: '80\u2013200 g (avg 120 g)',
    length: '8\u201312 cm body + 10 cm tail',
    height: '4\u20136 cm',
    lifespan: '1\u20133 years (max observed: 4)',
    diet: 'Seeds, pollen, small insects, dewdrops',
    behavior: 'Nocturnal. Nests in grass tussocks woven into spherical shelters. Females produce up to 4 litters per year. Alarm calls are ultrasonic, inaudible to most predators.',
    adaptation: 'Adhesive cheek-pouch lining for seed transport. Prehensile barometric tail. Ultrasonic vocalization (45\u201370 kHz). Metabolic torpor during food scarcity.',
    status: 'Abundant \u2014 critical seed dispersal mutualist'
  },

  // ══════════════════════════════════════════
  //  ICE TUNDRA (B1) — The Crystalline Waste
  // ══════════════════════════════════════════

  'prey-4': {
    name: 'Frostmite',
    sciName: 'Glaciarachne crystallis',
    type: 'Prey',
    biome: 'Ice Tundra',
    tagline: 'The living crystal of the frozen wastes',
    desc: 'The Frostmite is a small arachnid-like arthropod whose exoskeleton incorporates actual ice crystals into its structure, giving it a glass-like transparency that renders it nearly invisible against snow and ice. Its eight legs end in micro-serrated grips that allow it to traverse sheer ice faces at speed. The Frostmite\'s hemolymph contains a glycoprotein antifreeze compound that remains liquid at -60\u00b0C, an adaptation that has drawn intense research interest. In direct sunlight, its crystalline carapace refracts light into tiny rainbow patterns \u2014 the only reliable way to spot one in the wild.',
    weight: '5\u201315 g (avg 8 g)',
    length: '3\u20136 cm body, 8 cm legspan',
    height: '2\u20134 cm',
    lifespan: '2\u20134 years (max observed: 6)',
    diet: 'Frost algae, lichen, frozen microbial mats, wind-blown organic debris',
    behavior: 'Diurnal in summer, torpid in deep winter. Aggregates in crevices during storms, forming "mite clusters" of hundreds for thermal conservation. Cannibalistic under extreme starvation.',
    adaptation: 'Ice-crystal exoskeleton for cryocamouflage. Glycoprotein antifreeze hemolymph. UV-reflective carapace prevents ice-lens burns. Can survive complete freezing for up to 72 hours.',
    status: 'Common \u2014 base of the tundra food web'
  },

  'prey-5': {
    name: 'Snowdrift',
    sciName: 'Niveptera thermala',
    type: 'Prey',
    biome: 'Ice Tundra',
    tagline: 'The thermal-winged moth of the aurora',
    desc: 'The Snowdrift is a large lepidopteran with wings covered in nano-structured scales that absorb infrared radiation, allowing it to fly in temperatures that would ground any comparable insect. Its wingspan of up to 25 cm makes it the largest flying invertebrate of the Crystalline Waste. During the long polar nights, Snowdrifts navigate by the aurora, their compound eyes uniquely sensitive to the magnetic-field-aligned light patterns. Most remarkably, their wing patterns are bioluminescent \u2014 soft blue-white pulses used in courtship displays that dot the tundra like earthbound stars.',
    weight: '20\u201350 g (avg 30 g)',
    length: '8\u201312 cm body',
    height: 'Wingspan 15\u201325 cm',
    lifespan: '1\u20132 years (max observed: 3)',
    diet: 'Nectar from thermal-vent flowers, wind-carried pollen, lichen sugars',
    behavior: 'Migratory within the tundra, following thermal vent activity. Courtship involves synchronized bioluminescent wing-flashing. Larvae develop inside snow-insulated cocoons near geothermal vents.',
    adaptation: 'IR-absorbing wing nanoscales generate metabolic heat. Aurora-sensitive compound eyes for polar navigation. Bioluminescent wing chromatophores. Antifreeze proboscis for feeding on frozen nectar.',
    status: 'Uncommon \u2014 dependent on geothermal vent corridors'
  },

  'prey-6': {
    name: 'Icewalker',
    sciName: 'Cryopodus imperialis',
    type: 'Prey',
    biome: 'Ice Tundra',
    tagline: 'The emperor of the ice',
    desc: 'Standing upright on powerful, clawed feet, the Icewalker resembles a stout, flightless bird with dense, oil-saturated plumage that repels water and traps an insulating air layer. Its social structure is the most complex of any tundra species: colonies of 30\u2013100 individuals maintain strict hierarchies, with elder Icewalkers directing group movements and young scouts ranging ahead to locate feeding grounds. During the brutal polar storms, Icewalkers perform their famous "thermal huddle," rotating positions so no individual remains on the frigid outer ring for more than a few minutes.',
    weight: '4\u20139 kg (avg 6 kg)',
    length: '30\u201340 cm body',
    height: '35\u201345 cm (standing)',
    lifespan: '8\u201315 years (max observed: 22)',
    diet: 'Sub-ice crustaceans, frozen fish, ice algae blooms',
    behavior: 'Highly social colonial species. Thermal huddling during storms with democratic rotation. Complex vocalizations with individual voice recognition. Biparental care with creche system for chicks.',
    adaptation: 'Oil-saturated plumage with triple-layer insulation. Counter-current heat exchange in feet prevents freezing on ice. Subcutaneous fat reserves sustain 30-day fasting during storms.',
    status: 'Stable \u2014 indicator species for tundra health'
  },

  'prey-7': {
    name: 'Chillworm',
    sciName: 'Gelovermis translucens',
    type: 'Prey',
    biome: 'Ice Tundra',
    tagline: 'The ghost beneath the ice',
    desc: 'This translucent, segmented vermiform glides through channels in the ice itself, its body so transparent that its organs are visible as faint shadows within. The Chillworm secretes a mild enzymatic fluid from its skin that slowly melts narrow tunnels through ice sheets, creating the intricate vein-like channel networks visible in aerial surveys of the tundra. Its nervous system is distributed \u2014 a severed Chillworm can regenerate into two complete individuals within weeks. Researchers have observed Chillworms responding to magnetic field anomalies, suggesting they may use the planet\'s magnetic field for deep-ice navigation.',
    weight: '30\u201380 g (avg 50 g)',
    length: '12\u201320 cm',
    height: '1\u20132 cm diameter',
    lifespan: '3\u20135 years (max observed: 8, post-regeneration lineages may be indefinite)',
    diet: 'Ice-embedded microorganisms, ancient frozen organic material, bacterial films',
    behavior: 'Solitary. Creates and maintains tunnel networks in ice. Responds to vibrations by rapidly retreating deeper. Reproduces by fragmentation as well as sexually.',
    adaptation: 'Near-total transparency for predator evasion. Enzymatic ice-melting secretion. Distributed nervous system enables regeneration from fragments. Magnetoreception for navigation.',
    status: 'Common \u2014 ice tunnel networks support entire sub-glacial ecosystems'
  },

  // ══════════════════════════════════════════
  //  DESERT (B2) — The Furnace Expanse
  // ══════════════════════════════════════════

  'prey-8': {
    name: 'Sandbug',
    sciName: 'Arenoscarab venustus',
    type: 'Prey',
    biome: 'Desert',
    tagline: 'The scorpion that gardens the dunes',
    desc: 'The Sandbug is a heavily armored arachnid whose segmented tail curls into a distinctive spiral at rest. Unlike its Earth analogs, the Sandbug\'s tail stinger injects not venom but a quick-hardening mineral cement used to construct elaborate underground burrow networks reinforced against collapse. Its sand-colored carapace is covered in micro-grooves that channel morning dew toward its mouth, solving the desert\'s most critical problem: water. Sandbug colonies maintain underground "gardens" of cultivated fungi, making them one of the few documented cases of agriculture in invertebrates on Veridion-7.',
    weight: '40\u2013120 g (avg 70 g)',
    length: '8\u201314 cm (including tail)',
    height: '4\u20137 cm',
    lifespan: '3\u20136 years (max observed: 9)',
    diet: 'Cultivated subterranean fungi, dried organic matter, smaller arthropods',
    behavior: 'Eusocial colonies of 20\u201380 individuals with queen, workers, and soldiers. Soldiers patrol burrow entrances. Workers maintain fungal gardens. Nocturnal foraging in single-file columns.',
    adaptation: 'Dew-channeling carapace microgrooves. Mineral-cement tail gland for construction. Reflective exoskeleton reduces solar heat absorption by 60%. Fungiculture behavior.',
    status: 'Common \u2014 burrow networks provide shelter for 12+ other species'
  },

  'prey-9': {
    name: 'Dustrunner',
    sciName: 'Pulvisaurus cursor',
    type: 'Prey',
    biome: 'Desert',
    tagline: 'The bipedal sprinter of the burning sands',
    desc: 'The Dustrunner is an elegant, lean reptilian capable of explosive bipedal sprints exceeding 60 km/h across open sand. Its elongated hind toes are fringed with comb-like scales that increase surface area, allowing it to run across loose dunes without sinking \u2014 a technique researchers call "sand-skating." A large frill of erectile tissue along its neck serves triple duty: threat display, thermoregulation, and courtship signaling, flushing with vivid orange and crimson when engorged with blood. Dustrunners are among the most visually acute species documented, with tetrachromatic vision that extends into the ultraviolet.',
    weight: '0.5\u20132 kg (avg 1 kg)',
    length: '20\u201335 cm body + 25 cm tail',
    height: '18\u201328 cm (bipedal stance)',
    lifespan: '5\u201310 years (max observed: 14)',
    diet: 'Flying insects, small arthropods, succulent plant tips, dew',
    behavior: 'Diurnal ambush predator of insects. Territorial males display frills from elevated rocks. Females bury eggs in solar-heated sand. Young are independent from hatching.',
    adaptation: 'Fringed toe-scales for sand-skating. Erectile thermoregulatory frill. Tetrachromatic UV vision. Nasal counter-current cooling reduces brain temperature by 8\u00b0C.',
    status: 'Common \u2014 apex invertebrate predator, prey for larger species'
  },

  'prey-10': {
    name: 'Heatscale',
    sciName: 'Thermoserpens iridis',
    type: 'Prey',
    biome: 'Desert',
    tagline: 'The iridescent serpent of the thermal vents',
    desc: 'The Heatscale is a sinuous, limbless reptilian whose scales contain photonic crystal nanostructures that produce mesmerizing iridescent patterns shifting across the entire visible spectrum. This is not mere decoration \u2014 the scale coloration is actively controlled and used for intraspecific communication, with complex "color sentences" conveying mood, intent, and territorial claims. The Heatscale is an ambush predator of smaller desert fauna, coiling near game trails and striking with a speed of 3 meters per second. Its heat-sensing labial pits can detect temperature differentials of 0.003\u00b0C, effectively giving it thermal vision in complete darkness.',
    weight: '0.8\u20133 kg (avg 1.5 kg)',
    length: '60\u2013120 cm',
    height: '5\u20138 cm (coiled resting height)',
    lifespan: '8\u201315 years (max observed: 21)',
    diet: 'Rodent-analogs, lizards, large insects, bird eggs',
    behavior: 'Solitary and crepuscular. Ambush predator. Males engage in ritualized combat-dancing, intertwining bodies while displaying competitive color patterns. Ovoviviparous \u2014 gives live birth.',
    adaptation: 'Photonic crystal scales for active chromatic communication. Labial pit organs with 0.003\u00b0C thermal resolution. Hinged jaw allows prey ingestion up to 1.5x head diameter. Aestivates underground during peak heat.',
    status: 'Uncommon \u2014 scale nanostructure under study for optical technology'
  },

  'prey-11': {
    name: 'Mirage',
    sciName: 'Speculus refractans',
    type: 'Prey',
    biome: 'Desert',
    tagline: 'The beetle that bends light',
    desc: 'Named for its uncanny defensive ability, the Mirage is a dome-shelled beetle whose carapace is composed of layered chitin with precisely spaced air gaps that function as a biological metamaterial, bending light around its body. When motionless on sand, a Mirage becomes genuinely difficult to see \u2014 not invisible, but shimmering and indistinct, like a heat mirage. This passive optical camouflage is complemented by an active defense: when seized, the Mirage releases a burst of superheated chemical spray from thoracic glands, reaching 95\u00b0C. Mirages are solitary and fiercely territorial, with males constructing elaborate sand mounds as courtship platforms.',
    weight: '15\u201340 g (avg 25 g)',
    length: '4\u20137 cm',
    height: '3\u20135 cm (dome height)',
    lifespan: '2\u20134 years (max observed: 6)',
    diet: 'Dead organic matter, dried plant material, wind-blown seeds, smaller insects',
    behavior: 'Diurnal. Solitary and territorial. Males build sand-castle courtship mounds up to 15 cm tall. Rolls dung and organic balls for larval provisioning. Freezes when shadow passes overhead.',
    adaptation: 'Metamaterial carapace bends visible light for optical camouflage. Thoracic bombardier spray at 95\u00b0C. Hygroscopic shell absorbs atmospheric moisture. Can navigate by polarized light.',
    status: 'Common \u2014 carapace optics studied for stealth materials research'
  },

  // ══════════════════════════════════════════
  //  RAINFOREST (B3) — The Emerald Canopy
  // ══════════════════════════════════════════

  'prey-12': {
    name: 'Vinefly',
    sciName: 'Vitiptera florans',
    type: 'Prey',
    biome: 'Rainforest',
    tagline: 'The butterfly that pollinates worlds',
    desc: 'The Vinefly\'s wings are living ecosystems unto themselves. Spanning up to 30 cm, each wing membrane supports a symbiotic colony of photosynthetic microalgae that supplement the insect\'s nutrition through sugar secretion, effectively giving the Vinefly the ability to "photosynthesize" while basking. The wing patterns \u2014 elaborate fractals of emerald, gold, and violet \u2014 are not pigmented but structural, generated by the algal colonies arranging themselves into diffraction gratings. As the primary pollinator for over 60 canopy flower species, the Vinefly is arguably the single most ecologically critical invertebrate in the Emerald Canopy.',
    weight: '10\u201330 g (avg 18 g)',
    length: '6\u201310 cm body',
    height: 'Wingspan 18\u201330 cm',
    lifespan: '6\u201318 months (max observed: 2 years)',
    diet: 'Flower nectar, fruit juices, supplemented by symbiotic algal photosynthesis',
    behavior: 'Diurnal. Follows established pollination routes through the canopy called "nectar highways." Males perform aerial acrobatic displays, creating light shows with wing diffraction. Migratory within canopy layers.',
    adaptation: 'Symbiotic photosynthetic wing algae. Structural coloration via algal diffraction gratings. Proboscis length matches co-evolved flower depths. UV wing markings visible only to conspecifics.',
    status: 'Common \u2014 keystone pollinator, extinction would collapse canopy reproduction'
  },

  'prey-13': {
    name: 'Canopod',
    sciName: 'Arborarachne pavonis',
    type: 'Prey',
    biome: 'Rainforest',
    tagline: 'The peacock architect of the treetops',
    desc: 'The Canopod is a large, brilliantly colored arachnid that constructs three-dimensional web structures of astonishing complexity \u2014 not for trapping prey, but as architectural courtship displays. Males spend weeks building geometric web-sculptures spanning up to a meter across, incorporating bioluminescent silk strands that glow in species-specific patterns. Females evaluate these structures for symmetry, complexity, and luminous intensity before selecting a mate. The Canopod is primarily herbivorous, feeding on fruit and plant sap \u2014 an unusual diet for an arachnid \u2014 supplemented by opportunistic scavenging of small insects.',
    weight: '50\u2013150 g (avg 90 g)',
    length: '10\u201318 cm body, 25 cm legspan',
    height: '8\u201314 cm (standing)',
    lifespan: '2\u20135 years (max observed: 7)',
    diet: 'Overripe fruit, plant sap, flower petals, opportunistic insect scavenging',
    behavior: 'Males build elaborate bioluminescent web-sculptures for courtship. Females destroy and consume the web after mating (nutrient recovery). Territorial \u2014 webs spaced 3\u20135 meters apart in canopy.',
    adaptation: 'Bioluminescent silk production (4 distinct wavelengths). Modified chelicerae for fruit processing. Pedipalps function as manipulatory "hands." Color-shifting setae for mood communication.',
    status: 'Uncommon \u2014 web architecture studied for structural engineering insights'
  },

  'prey-14': {
    name: 'Mosscrawl',
    sciName: 'Muscovermes photicus',
    type: 'Prey',
    biome: 'Rainforest',
    tagline: 'The living garden that walks',
    desc: 'The Mosscrawl is a caterpillar-like organism that has achieved something extraordinary: obligate symbiosis with a photosynthetic moss species that grows directly on its dorsal surface. The moss provides up to 40% of the Mosscrawl\'s caloric needs through sugar translocation, while the Mosscrawl provides mobility, carrying its garden to optimal light positions throughout the day. Over its lifetime, a single Mosscrawl cultivates a moss garden that can weigh more than the animal itself. When the Mosscrawl eventually pupates, its moss garden sporulates explosively, seeding the surrounding canopy with the next generation of symbionts.',
    weight: '100\u2013400 g (avg 200 g, including moss)',
    length: '15\u201325 cm',
    height: '5\u20138 cm (with moss canopy)',
    lifespan: '1\u20133 years (max observed: 4)',
    diet: 'Decaying leaves, bark fungi, supplemented 40% by symbiotic moss photosynthesis',
    behavior: 'Diurnal phototactic \u2014 slowly repositions to follow sunlight patches. Extremely slow-moving (2\u20135 cm/minute). Aggregates with other Mosscrawls in "moss meadows" on large branches.',
    adaptation: 'Dorsal integument supports living moss symbiont. Mucus secretions nourish moss and prevent desiccation. Pupation triggers moss sporulation for symbiont propagation. Camouflage is nearly perfect.',
    status: 'Common \u2014 moss symbiosis is a model system for mutualism research'
  },

  'prey-15': {
    name: 'Bloomwing',
    sciName: 'Floroptera prismatica',
    type: 'Prey',
    biome: 'Rainforest',
    tagline: 'The prismatic jewel of the understory',
    desc: 'The Bloomwing is a dragonfly-analog of extraordinary aerial capability, with four independently articulated wings that allow it to hover, fly backwards, and execute instantaneous 90-degree turns at full speed. Its compound eyes contain over 30,000 facets \u2014 the highest count of any documented arthropod \u2014 giving it near-360-degree vision with exceptional motion detection. The Bloomwing\'s body is adorned with prismatic scales that split ambient light into cascading rainbow patterns, creating a dazzling "light trail" as it flies through sunbeams penetrating the canopy. Despite its small size, it is a voracious micro-predator, consuming up to 200 small insects per day.',
    weight: '8\u201320 g (avg 12 g)',
    length: '6\u201310 cm body + 4 cm tail',
    height: 'Wingspan 12\u201322 cm',
    lifespan: '1\u20133 years (max observed: 4)',
    diet: 'Small flying insects, gnats, aphid-analogs, occasional nectar',
    behavior: 'Diurnal aerial hunter. Establishes hunting territories over streams and clearings. Males perform synchronized formation flights during mating season. Larvae are aquatic, developing in bromeliad pools.',
    adaptation: '30,000+ facet compound eyes with 360\u00b0 vision. Four independent wing articulation for extreme maneuverability. Prismatic body scales create dazzle-camouflage light trails. Aquatic larvae breathe through caudal gills.',
    status: 'Common \u2014 important bio-indicator of canopy water quality'
  },

  // ══════════════════════════════════════════
  //  SWAMP (B4) — The Twilight Mire
  // ══════════════════════════════════════════

  'prey-16': {
    name: 'Bogskimmer',
    sciName: 'Palustrider electris',
    type: 'Prey',
    biome: 'Swamp',
    tagline: 'The electric dancer on dark waters',
    desc: 'The Bogskimmer walks on water. Its impossibly long, hydrophobic legs distribute its negligible weight across the surface tension of the Twilight Mire\'s dark waters, allowing it to glide, pivot, and sprint across open water as if on solid ground. Each leg terminates in a pad of electroreceptive cells that detect the bioelectric fields of prey organisms beneath the surface \u2014 the Bogskimmer literally feels the heartbeats of submerged creatures through the water. When a target is located, it pierces the surface with a rapid strike of its proboscis, injecting digestive enzymes and extracting liquefied nutrients. At night, faint electrical discharges along its leg joints create blue sparks visible across the marshes.',
    weight: '3\u201310 g (avg 6 g)',
    length: '6\u201312 cm body',
    height: '4 cm body, 15\u201325 cm total with legs',
    lifespan: '1\u20132 years (max observed: 3)',
    diet: 'Subsurface insect larvae, small crustaceans, algal films (all consumed via proboscis)',
    behavior: 'Crepuscular and nocturnal. Skates across water surface in quick dashes. Aggregates near nutrient upwellings. Males produce electrical courtship signals through water surface.',
    adaptation: 'Hydrophobic leg microstructure for surface tension locomotion. Electroreceptive foot pads detect sub-millivolt bioelectric fields. Proboscis injects external digestive enzymes. Bioluminescent leg-joint sparks.',
    status: 'Common \u2014 used as bioindicator for water toxicity levels'
  },

  'prey-17': {
    name: 'Murkeel',
    sciName: 'Caenoanguilla amphibia',
    type: 'Prey',
    biome: 'Swamp',
    tagline: 'The amphibious stalker of murky depths',
    desc: 'The Murkeel is a sleek, eel-like creature equally comfortable in water and on damp land, capable of surviving out of water for up to 48 hours by absorbing oxygen through its moist, mucus-coated skin. Its body produces a weak electrical field used for navigation in the turbid, zero-visibility waters of the Mire \u2014 a biological sonar system that builds a 3D map of its surroundings through electrical impedance. The Murkeel\'s most unsettling feature is its jaw, which can distend laterally to engulf prey nearly its own diameter. Despite this, it is primarily a scavenger, feeding on detritus and carrion.',
    weight: '0.5\u20132 kg (avg 1 kg)',
    length: '30\u201360 cm',
    height: '4\u20137 cm diameter',
    lifespan: '5\u201312 years (max observed: 17)',
    diet: 'Organic detritus, carrion, aquatic invertebrates, amphibian eggs, algae',
    behavior: 'Nocturnal. Solitary but tolerant of conspecifics. Migrates between pools during dry periods by overland "walking" on pectoral fins. Buries in mud during extreme drought (aestivation).',
    adaptation: 'Cutaneous respiration allows 48-hour land survival. Electrolocation field for turbid water navigation. Laterally distending jaw. Pectoral fin-walking for overland migration. Drought aestivation in mud cocoons.',
    status: 'Common \u2014 important nutrient recycler in aquatic food web'
  },

  'prey-18': {
    name: 'Pondhopper',
    sciName: 'Stagnirana regenerans',
    type: 'Prey',
    biome: 'Swamp',
    tagline: 'The frog that refuses to die',
    desc: 'The Pondhopper is a robust amphibian celebrated for its extraordinary regenerative abilities. It can regrow lost limbs, tail, and even portions of its jaw within 6\u20138 weeks \u2014 a capability that makes it remarkably resilient to predation. Individuals bearing scars and regenerated limbs of slightly different coloration are common. Its vocal sac can inflate to nearly the size of its body, producing resonant calls that carry over 2 km across the flat marshlands, creating the characteristic "twilight chorus" of the Mire. The Pondhopper\'s skin secretes a mild analgesic compound currently under pharmaceutical investigation.',
    weight: '100\u2013400 g (avg 200 g)',
    length: '10\u201318 cm',
    height: '6\u201310 cm (sitting)',
    lifespan: '4\u20138 years (max observed: 13)',
    diet: 'Insects, larvae, small crustaceans, aquatic plants, algae',
    behavior: 'Crepuscular. Males maintain and defend calling territories at water\'s edge. Females select males by call complexity and duration. Tadpoles are communally reared in warm shallows. Hibernates in mud during cold periods.',
    adaptation: 'Full limb regeneration in 6\u20138 weeks, including nerves and bone. Analgesic skin secretions deter predators. Vocal sac resonance audible at 2+ km. Freeze-tolerant \u2014 survives partial body ice formation.',
    status: 'Common \u2014 regenerative biology under active pharmaceutical research'
  },

  'prey-19': {
    name: 'Mistshell',
    sciName: 'Nebulocochlea luminosa',
    type: 'Prey',
    biome: 'Swamp',
    tagline: 'The glowing sentinel of the fog',
    desc: 'The Mistshell is a large gastropod whose logarithmic spiral shell contains a network of bioluminescent channels that pulse with soft amber light in patterns unique to each individual \u2014 a biological fingerprint. When threatened, the Mistshell can rapidly expel a cloud of dense, irritant mist from specialized mantle glands, creating a 2-meter obscuring fog that burns the eyes and respiratory passages of would-be predators. This mist lingers for several minutes in the still swamp air, marking danger zones that other Mistshells learn to avoid. The species is hermaphroditic, and individuals can self-fertilize if no mate is found \u2014 though cross-fertilization produces more vigorous offspring.',
    weight: '200\u2013800 g (avg 400 g)',
    length: '8\u201315 cm shell diameter',
    height: '6\u201310 cm (with extended body)',
    lifespan: '10\u201325 years (max observed: 38)',
    diet: 'Decaying plant matter, fungal fruiting bodies, bacterial films, calcium-rich mud',
    behavior: 'Nocturnal. Extremely slow-moving but persistent. Follows mucus trails of other Mistshells for mating. Hoards calcium deposits for shell growth. Shell-light patterns intensify during mating readiness.',
    adaptation: 'Bioluminescent shell channels with individual-specific patterns. Irritant mist defense (2m radius, persists 3\u20135 min). Hermaphroditic with facultative self-fertilization. Shell growth rings record environmental history like tree rings.',
    status: 'Stable \u2014 shells used as environmental archives (growth ring analysis)'
  },

  // ══════════════════════════════════════════
  //  PREDATORS
  // ══════════════════════════════════════════

  'gen': {
    name: 'Generalist Predator',
    sciName: 'Mantipraeda versatilis',
    type: 'Generalist Predator',
    biome: 'All Biomes (Roaming)',
    tagline: 'The adaptive nightmare that hunts everywhere',
    desc: 'The undisputed survivor of Veridion-7\'s food web, *Mantipraeda versatilis* is a large insectoid predator of terrifying adaptability. Its mantis-like forelimbs are lined with serrated spines that can grip prey of vastly different sizes and body plans, while its compound eyes provide 300-degree vision with acute motion detection across all light conditions. What makes the Generalist truly exceptional is its dietary plasticity: it can hunt, kill, and digest prey from any biome, adjusting its venom cocktail through epigenetic expression based on recent feeding history. Generalists are nomadic, crossing biome boundaries freely \u2014 a capability no other predator possesses. Field researchers report that Generalists display problem-solving behavior suggestive of high intelligence, including tool-use (wedging rocks to flush burrowing prey) and ambush trap construction.',
    weight: '0.8\u20132.5 kg (avg 1.5 kg)',
    length: '25\u201340 cm body + 8 cm antennae',
    height: '15\u201325 cm (rearing stance: 35 cm)',
    lifespan: '3\u20137 years (max observed: 10)',
    diet: 'Any prey species (all 20 documented prey species confirmed in gut analysis)',
    behavior: 'Solitary and nomadic. Crosses biome boundaries. Adjusts hunting strategy per prey type: ambush in forest, pursuit in grassland, excavation in desert. Cannibalistic during extreme scarcity. Females are 30% larger than males.',
    adaptation: 'Epigenetically variable venom cocktail adapts to prey biochemistry. Biome-crossing thermoregulation through hemolymph shunting. Serrated raptorial forelimbs. 300\u00b0 compound eye vision. Documented tool use and trap construction.',
    status: 'Stable \u2014 resilient to environmental shocks due to dietary flexibility'
  },

  'spec-0': {
    name: 'Plains Stalker',
    sciName: 'Campuleo regalis',
    type: 'Specialist Predator',
    biome: 'Grassland',
    tagline: 'The regal apex of the open steppe',
    desc: 'The largest terrestrial predator of the Luminous Steppe, the Plains Stalker is a muscular, quadrupedal carnivore with a distinctive mane of sensory quills that can detect wind-borne chemical traces from prey at distances exceeding 5 kilometers. Its tawny hide is patterned with disruptive markings that break its silhouette against the waving grasses. Plains Stalkers hunt in coordinated pairs or trios, executing pincer maneuvers that funnel prey into killzones \u2014 a strategy requiring sophisticated communication through subsonic vocalizations below the hearing range of prey species. A single Plains Stalker consumes approximately 3\u20134 kg of meat daily, and its powerful jaws can crush the armored plates of even adult Grazers.',
    weight: '60\u2013120 kg (avg 85 kg)',
    length: '130\u2013170 cm body + 60 cm tail',
    height: '90\u2013130 cm shoulder',
    lifespan: '12\u201320 years (max observed: 26)',
    diet: 'Grazers (primary), Hoppers, Burrowers, Seedlings, occasional carrion',
    behavior: 'Cooperative pair/trio hunting with subsonic coordination. Territorial \u2014 pairs defend 15\u201330 km\u00b2 ranges. Mating is monogamous and lifelong. Cubs remain with parents for 2 years. Caches surplus kills underground.',
    adaptation: 'Chemosensory mane quills detect prey scent at 5+ km. Subsonic vocal communication below prey hearing threshold. Jaw musculature generates 400+ kg bite force. Night vision via tapetum lucidum.',
    status: 'Vulnerable \u2014 requires large territory, sensitive to habitat fragmentation'
  },

  'spec-1': {
    name: 'Frost Fang',
    sciName: 'Cryolupus ferox',
    type: 'Specialist Predator',
    biome: 'Ice Tundra',
    tagline: 'The tireless hunter of the eternal ice',
    desc: 'The Frost Fang is an endurance predator \u2014 rather than ambush or sprint, it pursues prey at a relentless, energy-efficient trot that can be sustained for hours across the featureless ice. Its broad, fur-padded paws distribute weight like snowshoes, and its double-layered coat traps air so effectively that a sleeping Frost Fang leaves no thermal signature visible to infrared sensors. The pack structure is fluid, with 3\u20138 individuals forming temporary hunting coalitions that dissolve and reform based on prey availability. Most remarkably, Frost Fangs have been observed caching kills in natural ice cavities \u2014 using the environment as a freezer \u2014 and returning to cached prey weeks later during lean periods.',
    weight: '35\u201365 kg (avg 48 kg)',
    length: '100\u2013140 cm body + 40 cm tail',
    height: '70\u2013100 cm shoulder',
    lifespan: '10\u201316 years (max observed: 21)',
    diet: 'Icewalkers (primary), Chillworms, Frostmites, Snowdrifts, cached carrion',
    behavior: 'Fluid pack structure (3\u20138). Endurance pursuit hunting. Caches kills in ice for later retrieval. Howling communication carries 15 km across ice flats. Digs snow dens for birthing.',
    adaptation: 'Double-coat insulation eliminates thermal signature. Broad paw pads for weight distribution on ice. Endurance locomotion gait with minimal energy expenditure. Ice-caching food storage behavior.',
    status: 'Stable \u2014 well-adapted but restricted to tundra biome'
  },

  'spec-2': {
    name: 'Dune Striker',
    sciName: 'Arenaccipiter fulmineus',
    type: 'Specialist Predator',
    biome: 'Desert',
    tagline: 'Death from the thermal columns',
    desc: 'The Dune Striker is an aerial predator of breathtaking speed and precision. With a wingspan reaching 200 cm, it rides thermal updrafts to altitudes of 500+ meters, scanning the desert floor with binocular vision so acute it can detect a Sandbug\'s movement at 3 kilometers. When prey is sighted, the Dune Striker enters a controlled dive \u2014 the "strike" \u2014 tucking its wings and plummeting at speeds exceeding 180 km/h. Specialized nictitating membranes protect its eyes during the dive, and reinforced cervical vertebrae absorb the tremendous impact forces. The strike is almost always fatal. At rest, the Dune Striker\'s plumage shifts from hunting-brown to reflective silver, reducing solar heat absorption by 70%.',
    weight: '3\u20138 kg (avg 5 kg)',
    length: '50\u201370 cm body',
    height: 'Wingspan 140\u2013200 cm',
    lifespan: '15\u201325 years (max observed: 32)',
    diet: 'Dustrunners (primary), Sandbugs, Heatscales, Mirages, small carrion',
    behavior: 'Solitary except during breeding. Rides thermals for hours with minimal energy expenditure. Nests on cliff faces or rocky outcrops. Males perform aerial acrobatic displays for females. Monogamous for breeding season.',
    adaptation: 'Binocular visual acuity resolves targets at 3+ km. 180+ km/h dive speed. Reinforced cervical vertebrae for impact absorption. Thermochromic plumage (brown hunting / silver resting). Nictitating membrane eye protection.',
    status: 'Uncommon \u2014 requires large hunting territory, low reproduction rate'
  },

  'spec-3': {
    name: 'Canopy Prowler',
    sciName: 'Silvapanthera umbrata',
    type: 'Specialist Predator',
    biome: 'Rainforest',
    tagline: 'The shadow that moves between the leaves',
    desc: 'You don\'t see the Canopy Prowler. It sees you. This sleek, powerful felid-analog is the Emerald Canopy\'s ultimate stealth predator, equipped with chromatophore-laden fur that shifts color and pattern in real-time to match its background \u2014 effectively a biological active camouflage system. Moving along branches with absolute silence thanks to padded, semi-prehensile paws, the Canopy Prowler can stalk to within 2 meters of prey before launching an explosive ambush. Its retractable claws are coated in a mild paralytic secretion absorbed from the toxic insects it occasionally consumes, adding a chemical dimension to its physical attack. Solitary and intensely territorial, a single Canopy Prowler controls a vertical territory spanning three canopy layers.',
    weight: '40\u201380 kg (avg 55 kg)',
    length: '100\u2013140 cm body + 80 cm tail',
    height: '60\u201390 cm shoulder',
    lifespan: '14\u201322 years (max observed: 28)',
    diet: 'Canopods (primary), Vineflies, Mosscrawls, Bloomwings, arboreal vertebrates',
    behavior: 'Solitary. Ambush predator with active camouflage. Patrols vertical territory across 3 canopy layers. Scent-marks territory with facial gland secretions. Males roar at territorial boundaries \u2014 a sound that reverberates through the canopy.',
    adaptation: 'Chromatophore fur provides real-time active camouflage. Semi-prehensile paws for silent arboreal locomotion. Retractable claws with sequestered paralytic coating. Whiskers detect air pressure changes from nearby movement.',
    status: 'Rare \u2014 low population density, extremely difficult to study'
  },

  'spec-4': {
    name: 'Marsh Maw',
    sciName: 'Palucrocus vorax',
    type: 'Specialist Predator',
    biome: 'Swamp',
    tagline: 'The ancient leviathan of the deep mire',
    desc: 'The Marsh Maw is the largest predator documented on Veridion-7 and the longest-lived. This heavily armored, semi-aquatic reptilian lurks submerged in the Twilight Mire\'s opaque waters with only its eyes and nostrils breaking the surface, waiting with a patience measured in hours for prey to approach the water\'s edge. Its attack is an explosion of movement \u2014 a 350 cm body launching from the water with enough force to seize prey on the bank and drag it under in a single motion. The Marsh Maw\'s dorsal armor is so dense that it is functionally immune to attack by any other species, and specimens have been documented with Generalist predator spine fragments embedded harmlessly in their hide. Ancient Marsh Maws develop a garden of algae and small plants on their backs, becoming floating micro-ecosystems.',
    weight: '150\u2013400 kg (avg 250 kg)',
    length: '200\u2013350 cm',
    height: '40\u201360 cm (body height), 25 cm above waterline when submerged',
    lifespan: '30\u201360 years (max observed: 78)',
    diet: 'Pondhoppers (primary), Murkeels, Bogskimmers, Mistshells, any animal approaching waterline',
    behavior: 'Solitary ambush predator. Motionless for hours in shallow water. Females guard nests aggressively. Temperature-dependent sex determination in eggs. Older individuals become increasingly sedentary, developing algal camouflage.',
    adaptation: 'Dorsal armor impervious to predation. Explosive aquatic launch mechanism (0 to 30 km/h in 0.3 seconds). Pressure-sensing jaw detects water displacement from approaching prey. Algal dorsal garden provides supplemental camouflage. Indeterminate growth \u2014 never stops growing.',
    status: 'Stable \u2014 apex predator with no natural enemies'
  }
};


// ═══════════════════════════════════════
//  SPECIES MODAL — Display Logic
// ═══════════════════════════════════════

function getSpeciesIcon(speciesId) {
  // Returns the SVG path and fill color for a species
  if (speciesId.indexOf('prey-') === 0) {
    var idx = parseInt(speciesId.replace('prey-', ''));
    return { path: PREY_PATHS[idx], color: PREY_COLORS[idx] };
  }
  if (speciesId === 'gen') {
    return { path: GEN_PATH, color: '#f5a623' };
  }
  if (speciesId.indexOf('spec-') === 0) {
    var bIdx = parseInt(speciesId.replace('spec-', ''));
    return { path: SPEC_PATHS[bIdx], color: '#ef4455' };
  }
  return { path: '', color: '#888' };
}

// Ordered list of all species keys for navigation
var SPECIES_KEYS = Object.keys(SPECIES_LORE);
var currentSpeciesId = null;

function navigateSpecies(direction) {
  if (!currentSpeciesId) return;
  var idx = SPECIES_KEYS.indexOf(currentSpeciesId);
  if (idx === -1) return;
  idx = (idx + direction + SPECIES_KEYS.length) % SPECIES_KEYS.length;
  showSpeciesModal(SPECIES_KEYS[idx]);
}

function showSpeciesModal(speciesId) {
  var data = SPECIES_LORE[speciesId];
  if (!data) return;
  currentSpeciesId = speciesId;

  var icon = getSpeciesIcon(speciesId);
  var modal = document.getElementById('species-modal');
  var content = document.getElementById('species-modal-body');
  if (!modal || !content) return;

  var html = '';

  // Header with icon and name
  html += '<div class="modal-header">';
  html += '  <svg class="modal-icon" viewBox="0 0 16 16" width="64" height="64">';
  html += '    <path d="' + icon.path + '" fill="' + icon.color + '"/>';
  html += '  </svg>';
  html += '  <div class="modal-title-block">';
  html += '    <h3 class="modal-name" style="color:' + icon.color + ';">' + data.name + '</h3>';
  html += '    <div class="modal-sci"><em>' + data.sciName + '</em></div>';
  html += '    <div class="modal-tagline">' + data.tagline + '</div>';
  html += '  </div>';
  html += '</div>';

  // Image — show actual image if available, otherwise placeholder
  var imgPath = 'images/' + speciesId + '.jpeg';
  html += '<div class="modal-img-slot">';
  html += '  <img class="modal-img" src="' + imgPath + '" alt="' + data.name + '" onerror="this.parentNode.innerHTML=\'<div class=\\\'modal-img-placeholder\\\'><svg viewBox=\\\'0 0 16 16\\\' width=\\\'80\\\' height=\\\'80\\\' style=\\\'opacity:0.15\\\'><path d=\\\'' + icon.path.replace(/'/g, "\\'") + '\\\' fill=\\\'' + icon.color + '\\\'/></svg><div>Illustration pending \\u2014 to be generated</div></div>\';">';
  html += '</div>';

  // Type & Biome badges
  html += '<div class="modal-badges">';
  html += '  <span class="badge badge-type">' + data.type + '</span>';
  html += '  <span class="badge badge-biome">' + data.biome + '</span>';
  html += '</div>';

  // Stats grid
  html += '<div class="modal-stats">';
  html += '  <div class="stat"><span class="stat-label">Weight</span><span class="stat-val">' + data.weight + '</span></div>';
  html += '  <div class="stat"><span class="stat-label">Length</span><span class="stat-val">' + data.length + '</span></div>';
  html += '  <div class="stat"><span class="stat-label">Height</span><span class="stat-val">' + data.height + '</span></div>';
  html += '  <div class="stat"><span class="stat-label">Lifespan</span><span class="stat-val">' + data.lifespan + '</span></div>';
  html += '</div>';

  // Description
  html += '<div class="modal-section">';
  html += '  <h4>Description</h4>';
  html += '  <p>' + data.desc + '</p>';
  html += '</div>';

  // Diet
  html += '<div class="modal-section">';
  html += '  <h4>Diet</h4>';
  html += '  <p>' + data.diet + '</p>';
  html += '</div>';

  // Behavior
  html += '<div class="modal-section">';
  html += '  <h4>Behavior</h4>';
  html += '  <p>' + data.behavior + '</p>';
  html += '</div>';

  // Adaptations
  html += '<div class="modal-section">';
  html += '  <h4>Unique Adaptations</h4>';
  html += '  <p>' + data.adaptation + '</p>';
  html += '</div>';

  // Conservation
  html += '<div class="modal-section modal-status">';
  html += '  <h4>Population Status</h4>';
  html += '  <p>' + data.status + '</p>';
  html += '</div>';

  // Navigation buttons
  html += '<div class="modal-nav">';
  html += '  <span class="modal-nav-pos">' + (SPECIES_KEYS.indexOf(speciesId) + 1) + ' / ' + SPECIES_KEYS.length + '</span>';
  html += '</div>';

  content.innerHTML = html;
  modal.style.display = 'flex';
  content.scrollTop = 0;
}

function hideSpeciesModal() {
  var modal = document.getElementById('species-modal');
  if (modal) modal.style.display = 'none';
}

// Close modal on overlay click or Escape key
document.addEventListener('click', function(e) {
  if (e.target && e.target.id === 'species-modal') hideSpeciesModal();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') hideSpeciesModal();
  var modal = document.getElementById('species-modal');
  if (modal && modal.style.display !== 'none') {
    if (e.key === 'ArrowLeft') { navigateSpecies(-1); e.preventDefault(); }
    if (e.key === 'ArrowRight') { navigateSpecies(1); e.preventDefault(); }
  }
});
