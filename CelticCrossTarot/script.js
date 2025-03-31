/*==============================BASIC FUNCTIONS===================================*/

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function upright_or_reversed() {
  if (getRndInteger(0, 1) == 0) {
    return "upright";
  } else {
    return "reversed";
  }
}

/*=================================MAJOR ARCANA===================================*/

var Fool = {
  name: "The Fool",
  index: 0,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/FOOL.PNG",
  rw_addendum:
    "Folly, mania, extravagance, intoxication, delirium, frenzy, bewrayment.\n \
    Reversed: Negligence, absence, distribution, carelessness, apathy, nullity, vanity.",
  rw_meaning:
    "<p>With light step, as if earth and its trammels had little power to restrain him, a young man in gorgeous vestments pauses \
    at the brink of a precipice among the great heights of the world; he surveys the blue distance before him--its expanse of sky rather than \
    the prospect below. His act of eager walking is still indicated, though he is stationary at the given moment; his dog is still bounding. \
    The edge which opens on the depth has no terror; it is as if angels were waiting to uphold him, if it came about that he leaped from the height. \
    His countenance is full of intelligence and expectant dream. He has a rose in one hand and in the other a costly wand, from which depends over his \
    right shoulder a wallet curiously embroidered. He is a prince of the other world on his travels through this one--all amidst the morning glory, \
    in the keen air. The sun, which shines behind him, knows whence he came, whither he is going, and how he will return by another path after \
    many days. He is the spirit in search of experience. Many symbols of the Instituted Mysteries are summarized in this card, which reverses, under \
    high warrants, all the confusions that have preceded it.</p> <p>\
    In his Manual of Cartomancy, Grand Orient has a curious suggestion of the office of Mystic Fool, as apart of his process in higher divination; \
    but it might call for more ordinary gifts to put it into operation. We shall see how the card fares according to the common arts of fortune-telling, \
    and it will be an example, to those who can discern, of the fact, otherwise so evident, that the Trumps Major had no place originally in the arts of \
    psychic gambling, when cards are used as the counters and pretexts. Of the circumstances under which this art arose we know, however, very little. \
    The conventional explanations say that the Fool signifies the flesh, the sensitive life, and by a peculiar satire its subsidiary name was at one time \
    the alchemist, as depicting folly at the most insensate stage.</p>"
};

var Magician = {
  name: "The Magician",
  index: 1,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img:
    "./images/MAGICIAN.PNG",
  rw_addendum:
    "Skill, diplomacy, address, subtlety; sickness, pain, loss, disaster, snares of enemies; \
    self-confidence, will; the Querent, if male. Reversed: Physician, Magus, mental disease, disgrace, disquiet.",
  rw_meaning:
    "<p>A youthful figure in the robe of a magician, having the countenance of the divine Apollo, with smile of confidence \
    and shining eyes. Above his head is the mysterious sign of the Holy Spirit, the sign of life, like an endless cord, forming the \
    figure 8 in a horizontal position [infinity symbol]. About his waist is a serpent-cincture, the serpent appearing to devour \
    its own tail. This is familiar to most as a conventional symbol of eternity, but here it indicates more especially the eternity of \
    attainment in the spirit. In the Magician's right hand is a wand raised towards heaven, while the left hand is pointing to \
    the earth. This dual sign is known in very high grades of the Instituted Mysteries; it shews the descent of grace, virtue, and \
    light, drawn from things above and derived to things below. The suggestion throughout is therefore the possession and communication\
    of the Powers and Gifts of the Spirit. On the table in front of the Magician are the symbols of the four Tarot suits, signifying the\
    elements of natural life, which lie like counters before the adept, and he adapts them as he wills. Beneath are roses and lilies, the \
    flos campi and lilium convallium, changed into garden flowers, to shew the culture of aspiration. This card signifies the divine motive\
    in man, reflecting God, the will in the liberation of its union with that which is above. It is also the u nity of individual being on\
    all planes and in a very high sense it is thought, in the fixation thereof. With further reference to what I have called the sign of \
    life and its connexion with the number 8, it may be remembered that Christian Gnosticism speaks of rebirth in Christ as a change\
    'unto the Ogdoad. The mystic number is termed Jerusalem above, the Land flowing with Milk and Honey, the Holy Spirit and the Land\
    of the Lord. According to Martinism, 8 is the number of Christ.</p><p>\
    He signifies the journey outward, the state of the first emanation, the graces and passivity of the spirit. His wallet is inscribed\
    with dim signs, to shew that many subconcious memories are stored up in the soul.</p>"
};

var HighPriestess = {
  name: "The High Priestess",
  index: 2,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img:
    "./images/HIGHPRIESTESS.PNG",
  rw_addendum:
    "Secrets, mystery, the future as yet unrevealed; the woman who interests the Querent, if male;\n \
    the Querent herself, if female; silence, tenacity; mystery, wisdom, science. Reversed: Passion, moral or physical ardour, conceit, surface knowledge.",
  rw_meaning:
    "<p>She has the lunar crescent at her feet, a horned diadem on her head, with a globe in the middle place, and \
    a large solar cross on her breast. The scroll in her hands is inscribed with the word Tora, signifying the Greater Law, \
    the Secret Law and the second sense of the Word. It is partly covered by her mantle, to shew that some things are implied and \
    some spoken. She is seated between the white and black pillars--J. and B.--of the mystic Temple, and the veil of the Temple is behind her: \
    it is embroidered with palms and pomegranates. The vestments are flowing and gauzy, and the mantle suggests light--a shimmering radiance.</p><p>\
    She has been called occult Science on the threshold of the Sanctuary of Isis, but she is really the Secret Church, the House which is of God and man.\
    She represents also the Second Marriage of the Prince who is no longer of this world; she is the spiritual Bride and Mother, the daughter\
    of the stars and the Higher Garden of Eden. She is, in fine, the Queen of the borrowed light, but this is the light of all. She is the Moon\
    nourished by the milk of the Supernal Mother.</p><p> \
    In a manner, she is also the Supernal Mother herself--that is to say, she is the bright reflection. It is in this sense of reflection that her truest\
    and highest name in bolism is Shekinah--the co-habiting glory. According to Kabalism, there is a Shekinah both above and below. \
    In the superior world it is called Binah, the Supernal Understanding which reflects to the emanations that are beneath. \
    In the lower world it is Malkuth--that world being, for this purpose, understood as a blessed Kingdom that with which\
    it is made blessed being the Indwelling Glory. Mystically speaking, the Shekinah is the Spiritual Bride of the just man, and when \
    he reads the Law she gives the Divine meaning. There are some respects in which this card is the highest and holiest of the Greater Arcana.</p>"
};

var Empress = {
  name: "The Empress",
  index: 3,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img:
    "./images/EMPRESS.PNG",
  rw_addendum:
    "Fruitfulness, action, initiative, length of days; the unknown, clandestine; also difficulty, doubt, ignorance.\n\
    Reversed: Light, truth, the unravelling of involved matters, public rejoicings; according to another reading, vacillation.",
  rw_meaning:
    "<p>A stately figure, seated, having rich vestments and royal aspect, as of a daughter of heaven and earth. Her diadem \
    is of twelve stars, gathered in a cluster. The symbol of Venus is on the shield which rests near her. A field of corn is ripening \
    in front of her, and beyond there is a fall of water. The sceptre which she bears is surmounted by the globe of this world. She is the \
    inferior Garden of Eden, the Earthly Paradise, all that is symbolized by the visible house of man. She is not Regina coeli, but she is still\
    refugium peccatorum, the fruitful mother of thousands. There are also certain aspects in which she has been correctly described as desire \
    and the wings thereof, as the woman clothed with the sun, as Gloria Mundi and the veil of the Sanctum Sanctorum; but she is not, I may \
    add, the soul that has attained wings, unless all the symbolism is counted up another and unusual way. She is above all universal fecundity \
    and the outer sense of the Word. This is obvious, because there is no direct message which has been given to man like that which is borne by woman; \
    but she does not herself carry its interpretation.</p><p>\n\
    In another order of ideas, the card of the Empress signifies the door or gate by which an entrance is obtained into this life, as into the Garden \
    of Venus; and then the way which leads out therefrom, into that which is beyond, is the secret known to the High Priestess; it is communicated \
    by her to the elect. Most old attributions of this card are completely wrong on the symbolism-- as, for example, its identification with the \
    Word, Divine Nature, the Triad, and so forth.</p>"
};

var Emperor = {
  name: "The Emperor",
  index: 4,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img:
    "./images/EMPEROR.PNG",
  rw_addendum:
    "Stability, power, protection, realization; a great person; aid, reason, conviction; also authority and will.\n\
    Reversed: Benevolence, compassion, credit; also confusion to enemies, obstruction, immaturity.",
  rw_meaning:
    "<p>He has a form of the Crux ansata for his sceptre and a globe in his left hand. He is a crowned monarch--commanding, stately, \
    seated on a throne, the arms of which are fronted by rams' heads. He is executive and realization, the power of this world, here clothed \
    with the highest of its natural attributes. He is occasionally represented as seated on a cubic stone, which, however, confuses some of the issues. \
    He is the virile power, to which the Empress responds, and in this sense is he who seeks to remove the Veil of Isis; yet she remains virgo intacta.</p><p>\n\
    It should be understood that this card and that of the Empress do not precisely represent the condition of married life, though this state is implied. \
    On the surface, as I have indicated, they stand for mundane royalty, uplifted on the seats of the mighty; but above this there is the suggestion \
    of another presence. They signify also--and the male figure especially--the higher kingship, occupying the intellectual throne. Hereof is \
    the lordship of thought rather than of the animal world. Both personalities, after their own manner, are 'full of strange experience', but \
    theirs is not consciously the wisdom which draws from a higher world. The Emperor has been described as (a) will in its embodied form, but this is \
    only one of its applications, and (b) as an expression of virtualities contained in the Absolute Being--but this is fantasy.</p>"
};

var Hierophant = {
  name: "The Hierophant",
  index: 5,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img:
    "./images/HIEROPHANT.PNG",
  rw_addendum:
    "Marriage, alliance, captivity, servitude; by another account, mercy and goodness; inspiration; the man to whom the Querent has recourse.\n\
    Reversed: Society, good understanding, concord, overkindness, weakness.",
  rw_meaning:
    "<p>He wears the triple crown and is seated between two pillars, but they are not those of the Temple which is guarded \
    by the High Priestess. In his left hand he holds a sceptre terminating in the triple cross, and with his right hand he gives \
    the well-known ecclesiastical sign which is calleed that of esotericism, distinguishing between the manifest and concealed part \
    of the doctrine. It is noticeable in this connexion that the High Priestess makes no sign. At his feet are the crossed keys, and two \
    priestly ministers in albs kneel before him. He has been usually called the Pope, which is a particular application of the more general \
    office that he symbolizes. He is the ruling power of external religion, as the High Priestess is the prevailing genius of the esoteric, \
    withdrawn power. </p><p>\
    The proper meanings of this card have suffered woeful admixture from nearly all hands. Grand Orient says truly that \
    the Hierophant is the power of the keys, exoteric orthodox doctrine, and the outer side of the life which leads to the doctrine; \
    but he is certainly not the prince of occult doctrine, as another commentator has suggested.\
    He is rather the summa totius theologiae, when it has passed into the utmost rigidity of expression; \
    but he symbolizes also all things that are righteous and sacred on the manifset side. </p><p> As such, he is the channel of grace belonging \
    to the world of institution as distinct from that of Nature, and he is the leader of salvation for the human race at large. \
    He is the order and the head of the recognized hierarchy, which is the reflection of another and greater hierarchic order; \
    but it may so happen that the pontiff forgets the significance of this his symbolic state and acts as if he contained within his \
    proper measures all that his sign signifies or his symbol seeks to shew forth. He is not, as it has been thought, philosophy--\
    except on the theological side; he is not inspiration; and he is not religion, although he is a mode of its expression."
};

var Lovers = {
  name: "The Lovers",
  index: 6,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/LOVERS.PNG",
  rw_addendum:
    "Attraction, love, beauty, trials overcome.\n\
    Reversed: Failure, foolish designs. Another account speaks of marriage frustrated and contrarieties of all kinds.",
  rw_meaning:
    "<p>The sun shines in the zenith, and beneath is a great winged figure with arms extended, pouring down influences. In the \
    foreground are two human figures, male and female, unveiled before each other, as if Adam and Eve when they first occupied the paradise \
    of the earthly body. Behind the man is the Tree of Life, bearing twelve fruits, and the Tree of the Knowledge of Good and Evil is behind the woman; \
    the serpent is twining round it. The figures suggest youth, virginity, innocence and love before it is contaminated by gross material desire.\
    This is in all simplicity the card of human love, here exhibited as part of the way, the truth and the life. It replaces, by recourse to first \
    principles, the old card of marriage, which I have described previously, and the later follies which depicted man between vice and virtue. \
    In a very high sense, the card is a mystery of the Covenant and Sabbath. </p><p>\
    The suggestion in respect of the woman is that she signifies that attraction towards the sensitive life which carries within it the idea \
    of the Fall of Man, but she is rather the working of a Secret Law of Providence than a willing and conscious temptress. It is through her \
    imputed lapse that man shall arise ultimately, and only by her can he complete himself. The card is therefore in its way another intimation \
    concerning the great mystery of womanhood. The old meanings fall to pieces of necessity with the old pictures, but even as interpretations \
    of the latter, some of them were of the order of commonplace and others were false in symbolism.</p>"
};

var Chariot = {
  name: "The Chariot",
  index: 7,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img:
    "./images/CHARIOT.PNG",
  rw_addendum:
    "Succour, providence; also war, triumph, presumption, vengeance, trouble.\n\
    Reversed: Riot, quarrel, dispute, litigation, defeat.",
  rw_meaning:
    "<p>An erect and princely figure carrying a drawn sword and corresponding, broadly speaking, to the traditional description which \
    I have given in the first part. On the shoulders of the victorious hero are supposed to be the Urim and Thummim. He has led captivity captive; \
    he is conquest on all planes--in the mind, in science, in progress, in certain trials of initiation. He has thus replied to the sphinx, \
    and it is on this account that I have accepted the variation of Eliphas Levi; two sphinxes thus draw his chariot. He is above all things triumph in the mind.</p><p>\n\
    It is to be understood for this reason (a) that the question of the sphinx is concerned with a Mystery of Nature and not of the world of Grace, to which the charioteer\
    could offer no answer; (b) that the planes of his conquest are manifest or external and not within himself; (c) that the liberation which \
    he effects may leave himself in the bondage of the logical understanding; (d) that the tests of initiation through which he has passed in triumph \
    are to be understood physically or rationally; and (e) that if he came to the pillars of that Temple between which the High Priestess is seated, \
    he could not open the scroll called Tora, nor if she questioned him could he answer. He is not hereditary royalty and he is not priesthood.</p>"
};

var Strength = {
  name: "Strength",
  index: 8,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img:
    "./images/STRENGTH.PNG",
  rw_addendum:
    "Power, energy, action, courage, magnanimity; also complete success and honours.\n\
    Reversed: Despotism, abuse if power, weakness, discord, sometimes even disgrace.",
  rw_meaning:
    "<p>A woman, over whose head there broods the same symbol of life which we have seen in the card of the Magician, is closing the jaws \
    of a lion. The only point in which this design differs from the conventional presentations is that her beneficient fortitude has already subdued \
    the lion, which is being led by a chain of flowers. For reasons which satisfy myself, this card has been interchanged with that of Justice, \
    which is usually numbered eight. As the variation carries nothing with it which will signify to the reader, there is no cause for explanation. \
    Fortitude, in one of its most exalted aspects, is connected wtih the Divine Mystery of Union; the virtue, of course, operates in all planes, \
    and hence draws on all in its symbolism. It connects also with innocentia inviolata, and with the strength which resides in contemplation. </p><p>\n\
    These higher meanings are, however, matters of inference, and I do not suggest that they are transparent on the surface of the card.\
    They are intimated in a concealed manner by the chain of flowers, which signifies, among many other things, the sweet yoke and the light burden \
    of Divine Law, when it has been taken into the heart of hearts. The card has nothing to do with self-confidence in the ordinary sense, though \
    this has been suggested--but it concerns the confidence of those whose strength is God, who have found their refuge in Him. There is one aspect in which \
    the lion signifies the passions, and she who is called Strength is the higher nature in its liberation. It has walked upon the asp and the basilisk \
    and has trodden down the lion and the dragon.</p>"
};

var Hermit = {
  name: "The Hermit",
  index: 9,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/HERMIT.PNG",
  rw_addendum:
    "Prudence, circumspection; also and especially treason, dissimulation, roguery, corruption.\n\
    Reversed: Concealment, disguise, policy, fear, unreasoned caution.",
  rw_meaning:
    "<p>The variation from conventional models in this card is only that the lamp is not enveloped partially in the mantle of its bearer, \
    who blends the idea of the Ancient of Days with the Light of the World. It is a star which shines in the lantern. I have said that this \
    is a card of attainment, and to extend this conception the figure is seen holding up his beacon on an eminence. Therefore the Hermit is not, \
    as Court de Gebelin explained, a wise man in search of truth and justice; nor is he, as a later explanation proposes, an especial example of experience. \
    His beacon intimates that 'where I am, you also may be.' </p><p>\n\
    It is further a card which is understood quite incorrectly when it is connected with the idea of occult isolation, as the protection of \
    personal magnetism against admixture. This is one of the frivolous renderings which we owe to Eliphas Levi. It has been adopted by the \
    French Order of Martinism and some of us have heard a great deal of the Silent and Unknown Philosophy enveloped by his mantle from the knowledge \
    of the profane. In true Martinism, the significance fo the term Philosophe inconnu was of another order. It did not refer to the intended concealment \
    of the Instituted Mysteries, much less of their substittues, but--like the card itself--to the truth that the Divine Mysteries secure their \
    own protection from those who are unprepared.</p> "
};

var WheelFortune = {
  name: "Wheel of Fortune",
  index: 10,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img:
    "./images/WHEEL_OF_FORTUNE.PNG",
  rw_addendum:
    "Destiny, fortune, success, elevation, luck, felicity.\n\
    Reversed: Increase, abundance, superfluity.",
  rw_meaning:
    "<p>In this symbol I have again followed the reconstruction of Eliphas Levi, who has furnished several variants. It is \
    legitimate--as I have intimated--to use Egyptian symbolism when this serves our purpose, provided that no theory of origin is implied therein. \
    I have, however, presented Typhon in his serpent form. The symbolism is, of course, not exclusively Egyptian, as the four Living Creatures of Ezekiel \
    occupy the angles of the card, and the wheel itself follows other indications of Levi in respect of Ezekiel's vision, as illustrative of the \
    particular Tarot Key. With the French occultist, and in the design itself, the symbolic picture stands for the perpetual motion of a fluidic universe \
    and for the flux of human life. The Sphinx is the equilibrium therein. The transliteration of Taro as Rota is inscribed on the wheel, counterchanged \
    with the letters of the Divine Name--to shew that Providence is imphed through all. But this is the Divine intention within, and the similar intention without \
    is exemplified by the four Living Creatures. Sometimes the sphinx is represented couchant on a pedestal above, which defrauds the symbolism \
    by stultifying the essential idea of stability amidst movement.</p><p>\
    Behind the general notion expressed in the symbol there lies the denial of chance and the fatality which is implied therein. It may be added that, \
    from the days of Levi onward, the occult explanations of this card are--even for occultism itself--of a singularly fatuous kind. It has been said \
    to mean principle, fecundity, virile honour, ruling authority, etc. The findings of common fortune-telling are better than this on their own plane.</p>"
};

var Justice = {
  name: "Justice",
  index: 11,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img:
    "./images/JUSTICE.PNG",
  rw_addendum:
    "Equity, rightness, probity, executive; triumph of the deserving side in law.\n\
    Reversed: Law in all its departments, legal complications, bigotry, bias, excessive severity.",
  rw_meaning:
    "<p>As this card follows the traditional symbolism and carries above all its obvious meanings, there is little to say regarding it \
    outside the few considerations collected in the first part, to which the reader is referred. \
    It will be seen, however, that the figure is seated between pillars, like the High Priestess, and on this account it seems desirable to indicate \
    that the moral principle which deals unto every man according to his works--while, of course, it is in strict analogy with higher things;--\
    differs in its essence from the spiritual justice which is involved in the idea of election. The latter belongs to a mysterious order of \
    Providence, in virtue of which it is possible for certain men to conceive the idea of dedication to the highest things. The operation of this \
    is like the breathing of the Spirit where it wills, and we have no canon of criticism or ground of explanation concerning it. It is analogous \
    to the possession of the fairy gifts and the high gifts and the gracious gifts of the poet: we have them or have not, and their presence \
    is as much a mystery as their absence. The law of Justice is not however involved by either alternative. In conclusion, the pillars of Justice \
    open into one world and the pillars of the High Priestess into another.</p>"
};

var HangedMan = {
  name: "The Hanged Man",
  index: 12,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img:
    "./images/HANGEDMAN.PNG",
  rw_addendum:
    "Wisdom, circumspection, discernment, trials, sacrifice, intuition, divination, prophecy.\n\
    Reversed: Selfishness, the crowd, body politic.",
  rw_meaning:
    "<p>The gallows from which he is suspended forms a Tau cross, while the figure--from the position of the legs--forms a fylfot cross.\
  There is a nimbus about the head of the seeming martyr. It should be noted (1) that the tree of sacrifice is living wood, with leaves thereon;\
  (2) that the face expresses deep entrancement, not suffering; (3) that the figure, as a whole, suggests life in suspension, but life and not death.\
  It is a card of profound significance, but all the significance is veiled. One of his editors suggests that Eliphas Levi did not know the meaning,\
  which is unquestionable nor did the editor himself. It has been called falsely a card of martyrdom, a card of prudence, a card of the Great Wrok,\
  a card of duty; but we may exhaust all published interpretations and find only vanity. I will say very simply on my own part that it expresses the relation,\n\
  in one of its aspects, between the Divine and the Universe.</p><p>\
  He who can understand that the story of his higher nature is imbedded in this symbolism will receive intimations concerning a great awakening\
  that is possible, and will know that after the sacred Mystery of Death there is a glorious Mystery of Resurrection.</p>"
};

var Death = {
  name: "Death",
  index: 13,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/DEATH.PNG",
  rw_addendum:
    "End, mortality, destruction, corruption; also, for a man, the loss of a benefactor; for a woman, many contrarieties; for a maid, failure of marriage projects.\n\
  Reversed: Inertia, sleep, lethargy, petrifaction, somnambulism; hope destroyed.",
  rw_meaning:
    "<p>The veil or mask of life is perpetuated in change, transsformation and passage from lower to higher, and this is more fitly\
  represented in the rectified Tarot by one of the apocalyptic visions than by the crude notion of the reaping skeleton. Behind it lies the \
  whole world of ascent in the spirit. The mysterious horseman moves slowly, bearing a black banner emblazoned with the Mystic Rose, which signifies\
   life. Between two pillars on the verge of the horizon there shines the sun of immortality. The horseman carries no visible weapon, but king and child and maiden \
   fall before him, while a prelate with clasped hands awaits his end.</p><p>\n\
   There should be no need to point out that the suggestion of death which I have made in connection with the previous card is, \
   of course, to be understood mystically, but this is not the case in the present instance. The natural transit of man to the next stage \
   of his being either is or may be one form of his progress, but the exotic and almost unknown entrance, while still in this life, into the state\
   of mystical death is a change in the form of consciousness and the passage into a state to which ordinary death is neither the path nor gate. \
   The existing occult explanations of the 13th card are, on the whole, better than usual, rebirth, creation, destination, renewal, and the rest.</p>"
};

var Temperance = {
  name: "Temperance",
  index: 14,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img:
    "./images/TEMPERANCE.PNG",
  rw_addendum:
    "Economy, moderation, frugality, management, accommodation.\n\
  Reversed: Things connected with churches, religions, sects, the priesthood, sometimes even the priest who will marry the Querent;\
  also disunion, unfortunate combinations, competing interests.",
  rw_meaning:
    "<p>A winged angel, with the sign of the sun upon his forehead and on his breast the square and triangle of the septenary.\
  I speak of him in the masculine sense, but the figure is neither male nor female. It is held to be pouring the essences of life from \
  chalice to chalice. It has one foot upon the earth and one upon the waters, thus illustrating the nature of the essences. A direct path \
  goes up to certain heights on the verge of the horizon, and above there is a great light, through which a crown is seen vaguely. Hereof \
  is some part of the Secret of Eternal Life, as it is possible to man in his incarnation. All the conventional emblems are renounced herein.</p><p>\
  So also are the conventional meanings, which refer to changes in the seasons, perpetual movement of life and even the combination of ideas. \
  It is, moreover, untrue to say that the figure symbolizes the genius of the sun, although it is the analogy of solar light, realized in the third part \
  of our human triplicity. It is called Temperance fantastically, because, when the rule of it obtains in our consciousness, it tempers, combines and harmonises \
  the psychic and material natures. Under that rule we know in our rational part something of whence we came and whither we are going.</p>"
};

var Devil = {
  name: "The Devil",
  index: 15,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/DEVIL.PNG",
  rw_addendum:
    "Ravage, violence, vehemence, extraordinary efforts, force, fatality; that which is predestined but is not for this reason evil.\n\
  Reversed: Evil fatality, weakness, pettiness, blindness.",
  rw_meaning:
    "<p>The design is an accommodation, mean or harmony, between several motives mentioned in the first part. The Horned Goat of Mendes, \
  with wings like those of a bat, is standing on an altar. At the pit of the stomach there is the sign of Mercury. The right hand is upraised \
  and extended, being the reverse of that benediction which is given by the Hierophant in the fifth card. In the left hand there is a great flaming torch\
  inverted towards the earth. A reversed pentagram is on the forehead. There is a ring in front of the altar, from which two chains are carried \
  to the necks of two figures, male and female. These are analogous with those of the fifth card, as if Adam and Eve after the Fall. Hereof \
  is the chain and fatality of the material life.</p><p> \n\
  The figures are tailed, to signify the animal nature, but there is human intelligence in the faces, and he who is exalted above them is not to be \
  their master for ever. Even now, he is also a bondsman, sustained by the evil that is in him and blind to the liberty of service. With more than \
  his usual derision for the arts which he pretended to respect and interpret as a master therein, Eliphas Levi affirms that the Baphometic figure is \
  occult science and magic. Another commentator says that in the Divine world it signifies predestination, but there is no correspondence in that world \
  with the things which below are of the brute. What it does signify is the Dweller on the Threshold without the Mystical Garden when those are driven forth \
  therefrom who have eaten the forbidden fruit.</p>"
};

var Tower = {
  name: "The Tower",
  index: 16,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/TOWER.PNG",
  rw_meaning: "",
  rw_addendum:
    "Misery, distress, indigence, adversity, calamity, disgrace, deception, ruin. It is a card in particular of unforeseen catastrophe.\n\
  Reversed: According to one account, the same in a lesser degree; also, oppression, imprisonment, tyranny.",
  rw_meaning:
    "<p>Occult explanations attached to this card are meagre and mostly disconcerting. It is idle to indicate that it depicts mind in all \
  its aspects, because it bears this evidence on the surface. It is said further that it contains the first allusion to a material building, but I \
  do not conceive that the Tower is more or less material than the pillars which we have met with in three previous cases. I see nothing to warrant \
  Papus in supposing that it is literally the fall of Adam, but there is more in favour of his alternative--that it signifes the materialization \
  of the spiritual word. The bibliographer Christian imagines that it is the downfall of the mind, seeking to penetrate the mystery of God. \
  I agree rather with Grand Orient that it is the ruin of the House of We, when evil has prevailed therein, and above all that it is the rending \
  of a House of Doctrine. I understand that the reference is, however, to a House of Falsehood. It illustrates also in the most comprehensive way \
  the old truth that 'except the Lord build the house, they labour in vain that build it.' </p><p>\n\
  There is a sense in which the catastrophe is a reflection from the previous card, but not on the side of the symbolism which I have tried \
  to indicate therein. It is more correctly a question of analogy; one is concerned with the fall into the material and animal state, while \
  the other signifies destruction on the intellectual side. The Tower has been spoken of as the chastisement of pride and the intellect overwhelmed \
  in the attempt to penetrate the Mystery of God; but in neither case do these explanations account for the two persons who are the living sufferers.\
  The one is the literal word made void and the other its false interpretation. In  yet a deeper sense, it may signify also the end of a dispensation, \
  but there is no possibility here for the consideration of this involved question.</p>"
};

var Star = {
  name: "Star",
  index: 17,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/STAR.PNG",
  rw_addendum:
    "Loss, theft, privation, abandnment; another reading says- hope and bright prospects.\n\
  Reversed: Arrogance, haughtiness, impotence.",
  rw_meaning:
    "<p>A great, radiant star of eight rays, surrounded by seven lesser stars--also of eight rays. The female figure \
  in the foreground is entirely naked. Her left knee is on the land and her right foot upon the water. She pours Water of Life \
  from two great ewers, irrigating sea and land. Behind her is rising ground and on the right a shrub or tree, whereon a bird alights.\
  The figure expresses eternal youth and beauty. The star is l'etoile flamboyante, which appears in Masonic symbolism, but has been \
  confused therein. That which the figure communicates to the living scene is the substance of the heavens and the elements. It has \
  been said truly that the mottoes of this card are 'Waters of Life freely' and 'Gifts of the Spirit.'</p><p>\
  The summary of several tawdry explantaions says that it is a card of hope. On other planes it has been certified as immortality and \
  interior light. For the majority of prepared minds, the figure will appear as the type of Truth unveiled, glorious in undying beauty, \
  pouring on the waters of the soul some part and measure of her priceless possession. But she is in reality the Great Mother in the \
  Kabalistic Sephira Binah, which is supernal Understanding, who communicates to the Sephiroth that are below in the measure \
  that they can receive her influx.</p>"
};

var Moon = {
  name: "The Moon",
  index: 18,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/MOON.PNG",
  rw_addendum:
    "Hidden enemies, danger, calumny, darkness, terror, deception, occult forces, error.\n\
  Reversed: Instability, inconstancy, silence, lesser degrees of deception and error.",
  rw_meaning:
    "<p>The distinction between this card and some of the conventional types is that the moon is increasing on what is called \
  the side of mercy, to the right of the observer. It has sixteen chief and sixteen secondary rays. The card represents life of the imagination \
  apart from life of the spirit. The path between the towers is the issue into the unknown. The dog and wolf are the fears of the natural \
  mind in the presence of that place of exit, when there is only reflected light to guide it.<p></p>\
  The last reference is a key to another form of symbolism. The intellectual light is a reflection and beyond it is the unknown mystery\
  which it cannot shew forth. It illuminates our animal nature, types of which are represented below--the dog, the wolf and that which comes up\
  out of the deeps, the nameless and hideous tendency which is lower than the savaage beast. It strives to attain manifestation, symbolized \
  by crawling from the abyss of water to the land, but as a rule it sinks back whence it came. The face of the mind directs a calm gaze \
  upon the unrest below; the dew of thought falls; the message is: Peace, be still; and it may be that there shall come a calm upon the animal nature, \
  while the abyss beneath shall cease from giving up a form.</p>"
};

var Sun = {
  name: "The Sun",
  index: 19,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/SUN.PNG",
  rw_addendum:
    "Material happiness, fortunate marriage, contentment.\n\
  Reversed: The same in a lesser sense.",
  rw_meaning:
    "<p>The naked child mounted on a white horse and displaying a red standard has been mentioned already as the better symbolism \
  connected with this card. It is the destiny of the Supernatural East and the great and holy light which goes before the endless procession \
  of humanity, coming out from the walled garden of the sensitive life and passing on the journey home. The card signifies, therefore, the transit \
  from the manifest light of this world, represented by the glorious sun of earth, to the light of the world to come, which goes before aspiration \
  and is typified by the heart of a child.</p>\n\
  <p>But the last allusion is again the key to a different form or aspect of the symbolism. The sun is that of consciousness in the spirit-- \
  the direct antithesis of the reflected light. The characteristic type of humanity has become a little child therein--a child in the sense of \
  simplicity and innocence in the sense of wisdom. In that simplicity, he bears the seal of Nature and of Art; in that innocence, he signifies \
  the restored world. When the self-knowing spirit has dawned in the consciousness above the natural mind, that mind in its renewal leads forth \
  the animal nature in a state of perfect conformity.</p>"
};

var Judgment = {
  name: "Judgment",
  index: 20,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img:
    "./images/JUDGEMENT.PNG",
  rw_addendum:
    "Change of position, renewal, outcome. Another account specifies total loss through lawsuit.\n\
  Reversed: Weakness, pusillanimity, simplicity; also deliberation, decision, sentence.",
  rw_meaning:
    "<p>I have said that this symbol is essentially invariable in all Tarot sets, or at least the variations do not alter its character.\
  The great angel is here encompassed by clouds, but he blows his bannered trumpet, and the cross as usual is displayed on the banner. The dead are \
  rising from their tombs--a woman on the right, a man on the left hand, and between them their child, whose back is turned. But in this card \
  there are more than three who are restored, and it has been thought worth while to make this variation as illustrating the insufficiency of current explanations. \
  It should be noted that all the figures are as one in the wonder, adoration and ecstasy expressed by their attitudes. It is the card which \
  registers the accomplishment of the great work of transformation in answer to the summons of the Supernal--which summons is heard and answered from within.</p><p>\
  Herein is the intimation of a significance which cannot well be carried further in the present place. What is that within us which does sound \
  a trumpet and all that is lower in our nature rises in response--almost in a moment, almost in the twinkling of an eye? Let the card continue \
  to depict, for those who can see no further, the Last judgment and the resurrection in the natural body; but let those who have inward eyes look \
  and discover therewith. They will understand that it has been called truly in the past a card of eternal life, and for this reason it may be \
  compared with that which passes under the name of Temperance.</p>"
};

var World = {
  name: "The World",
  index: 21,
  type: "Major Arcana",
  suit: "NA",
  element: "NA",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/WORLD.PNG",
  rw_addendum:
    "Assured success, recompense, voyage, route, emigration, flight, change of place.\n\
  Reversed: Inertia, fixity, stagnation, permanence.",
  rw_meaning:
    "<p>As this final message of the Major Trumps is unchanged--and indeed unchangeable--in respect of its design, it has been partly \
  described already regarding its deeper sense. It represents also the perfection and end of the Cosmos, the secret which is within it, the rapture \
  of the universe when it understands itself in God. It is further the state of the soul in the consciousness of Divine Vision, reflected from \
  the self-knowing spirit. But these meanings are without prejudice to that which I have said concerning it on the material side.</p><p> \n\
  It has more than one message on the macrocosmic side and is, for example, the state of the restored world when the law of manifestation \
  shall have been carried to the highest degree of natural perfection. But it is perhaps more especially a story of the past, referring to \
  that day when all was declared to be good, when the morning stars sang together and all the Sons of God shouted for joy. \
  One of the worst explanations concerning it is that the figure symbolizes the Magus when he has reached the highest degree of initiation; \
  another account says that it represents the absolute, which is ridiculous. The figure has been said to stand for Truth, which is, however, \
  more properly allocated to the seventeenth card. Lastly, it has been called the Crown of the Magi.</p>"
};

/*=================================MINOR ARCANA===================================*/
/*====================================WANDS=======================================*/

var AceWands = {
  name: "Ace of Wands",
  index: 22,
  type: "Minor Arcana",
  suit: "wands",
  element: "Fire",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/ACEWANDS.PNG",
  rw_addendum: "Calamities of all kinds. Reversed: A Sign of birth.",
  rw_meaning:
    "<p>A hand issuing from a cloud grasps a stout wand or club. </p><p>Divinatory Meanings: Creation, invention, enterprise, the powers which result in these; \
  principle, beginning, source; birth, family, origin, and in a sense the virility which is behind them; the starting point of enterprises; according to another account, \
  money, fortune, inheritance. </p><p>Reversed: Fall, decadence, ruin, perdition, to perish; also a certain clouded joy.</p>"
};

var TwoWands = {
  name: "Two of Wands",
  index: 23,
  type: "Minor Arcana",
  suit: "Wands",
  element: "Fire",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/2WANDS.PNG",
  rw_addendum: "A young lady may expect trivial disappointments.",
  rw_meaning:
    "<p>A tall man looks from a battlemented roof over sea and shore; he holds a globe in his right hand, while a staff in his left rests on the battlement; another \
  is fixed in a ring. The Rose and Cross and Lily should be noticed on the left side. </p><p>Divinatory Meanings: Between the alternative readings there is no marriage possible; \
  on the one hand, riches, fortune, magnificence; on the other, physical suffering, disease, chagrin, sadness, mortification. The design gives one suggestion: here is a lord \
  overlooking his dominion and alternately contemplating a globe; it looks like the malady, the mortification, the sadness of Alexander amidst the grandeur of this world's wealth.\
  </p><p>Reversed: Surprise, wonder, enchantment, emotion, trouble, fear.</p>"
};

var ThreeWands = {
  name: "Three of Wands",
  index: 24,
  type: "Minor Arcana",
  suit: "Wands",
  element: "Fire",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/3WANDS.PNG",
  rw_addendum: "A very good card; collaboration will favour enterprise.",
  rw_meaning:
    "<p>A calm, stately personage, with his back turned, looking from a cliff's edge at ships passing over the sea. Three staves are planted in the ground, and he leans\
  slightly on one of them.</p><p>Divinatory Meanings: He symbolizes established strength, enterprise, effort, trade, commerce, discovery; those are his ships, bearing his merchandise, \
  which are sailing over the sea. The card also signifies able co-operation in business, as if the successful merchant prince were looking from his side towards yours with a view \
  to help you. </p><p>Reversed: The end of troubles, suspension or cessation of adversity, toil and disappointment.</p>"
};

var FourWands = {
  name: "Four of Wands",
  index: 25,
  type: "Minor Arcana",
  suit: "Wands",
  element: "Fire",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/4WANDS.PNG",
  rw_addendum:
    "Unexpected good fortune. Reversed: A married woman will have beautiful children.",
  rw_meaning:
    "<p>From the four great staves planted in the foreground there is a great garland suspended; two female figures uplift nosegays; at their side is a bridge over a moat, \
  leading to an old manorial house.</p><p>Divinatory Meanings: They are for once almost on the surface--country life, haven of refuge, a species of domestic harvest-home, repose, concord, \
  harmony, prosperity, peace, and the perfected work of these.</p><p>Reversed: The meaning remains unaltered; it is prosperity, increase, felicity, beauty, embellishment.</p>"
};

var FiveWands = {
  name: "Five of Wands",
  index: 26,
  type: "Minor Arcana",
  suit: "Wands",
  element: "Fire",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/5WANDS.PNG",
  rw_addendum:
    "Success in financial speculation. Reversed: Quarrels may be turned to advantage.",
  rw_meaning:
    "<p>A posse of youths, who are brandishing staves, as if in sport or strife. It is mimic warfare, and hereto correspond the Divinatory Meanings: Imitation, as \
    for example, sham fight, but also the strenuous competition and struggle of the search after riches and fortune. In this sense it connects with the battle of life. Hence \
    some attributions say that it is a card of gold, gain, opulence.</p><p>Reversed: Litigation, disputes, trickery, contradiction.</p>"
};

var SixWands = {
  name: "Six of Wands",
  index: 27,
  type: "Minor Arcana",
  suit: "Wands",
  element: "Fire",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/6WANDS.PNG",
  rw_addendum:
    "Servants  may lose the confidence of their masters; a young lady may be betrayed by a friend. \n\
  Reversed: Fulfilment of deferred hope.",
  rw_meaning:
    "<p>A laureled horseman bears one staff adorned with a laurel crown; footmen with staves are at his side.</p><p>Divinatory Meanings: The card has been so designed that it \
  can cover several significations; on the surface, it is a victor triumphing, but it is also great news, such as might be carried in state by the King's courier; it is expectation \
  crowned with its own desire, the crown of hope, and so forth.</p><p>Reversed: Apprehension, fear, as of a victorious enemy at the gate; treachery, disloyalty, as of gates being opened to the\
  enemy; also indefinite delay.</p>"
};

var SevenWands = {
  name: "Seven of Wands",
  index: 28,
  type: "Minor Arcana",
  suit: "Wands",
  element: "Fire",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/7WANDS.PNG",
  rw_addendum: "A dark child.",
  rw_meaning:
    "<p>A young man on a craggy eminence brandishing a staff; six other staves are raised towards him from below.</p><p>Divinatory Meanings: It is a card of valour, \
  for, on the surface, six are attacking one, who has, however, the vantage position. On the intellectual plane, it signifies discussion, wordy strife; in business--negotations, \
  war of trade, barter, competition. It is further a card of success, for the combatant is on the top and his enemies may be unable to reach him.</p><p>Reversed: Perplexity, \
  embarrassments, anxiety. It is also a caution against indecision.</p>"
};

var EightWands = {
  name: "Eight of Wands",
  index: 29,
  type: "Minor Arcana",
  suit: "Wands",
  element: "Fire",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/8WANDS.PNG",
  rw_addendum: "Domestic disputes for a married person.",
  rw_meaning:
    "<p>The card represents motion through the immovable- a flight of wands through an open country; but they draw to the term of their course. That which they signify \
  is at hand; it may be even on the threshold.</p><p>Divinatory Meanings: Activity in undertakings, the path of such activity, swiftness, as that of an express messenger; great haste, \
  great hope, speed towards an end which promises assured felicity; generally, that which is on the move; also the arrows of love. </p><p>Reversed: Arrows of jealousy, internal dispute, \
  stingings of conscience, quarrels; and domestic disputes for persons who are married.</p>"
};

var NineWands = {
  name: "Nine of Wands",
  index: 30,
  type: "Minor Arcana",
  suit: "Wands",
  element: "Fire",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/9WANDS.PNG",
  rw_addendum: "Generally speaking, a bad card.",
  rw_meaning:
    "The figure leans upon his staff and has an expectant look, as if awaiting an enemy. Behind are eight other staves--erect, in orderly disposition, \
  like a palisade.</p><p>Divinatory Meanings: The card signifies strength in opposition. If attacked, the person will meet an onslaught boldly; and his build shews, \
  that he may prove a formidable antagonist. With this main significance there are all its possible adjuncts--delay, suspension, adjournment.</p><p>Reversed: Obstacles, adversity, calamity.</p>"
};

var TenWands = {
  name: "Ten of Wands",
  index: 31,
  type: "Minor Arcana",
  suit: "Wands",
  element: "Fire",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/10WANDS.PNG",
  rw_addendum: "Difficulties and contradictions, if near a good card.",
  rw_meaning:
    "<p>A man oppressed by the weight of the ten staves which he is carrying.</p><p>Divinatory Meanings; A card of many significances, and some of the readings cannot \
  be harmonized. I set aside that which connects it with honour and good faith. The chief meaning is oppression simply, but it is also fortune, gain, any kind of success, \
  and then it is the oppression of these things. It is also a card of false-seeming, disguise, perfidy. The place which the figure is approaching may suffer from the rods \
  that he carries. Success is stultified if the Nine of Swords follows, and if it is a question of a lawsuit, there will be certain loss. </p><p>Reversed: Contrarieties, difficulties, \
  intrigues, and their analogies.</p>"
};

var PageWands = {
  name: "Page of Wands",
  index: 32,
  type: "Minor Arcana",
  suit: "Wands",
  element: "Fire",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/PAGEWANDS.PNG",
  rw_addendum:
    "Young man of family in search of young lady. Reversed: Bad news.",
  rw_meaning:
    "<p>In a scene similar to the former, a young man stands in the act of proclamation. He is unknown but faithful, and his tidings are strange. </p><p>Divinatory Meanings: \
    Dark young man, faithful, a lover, an envoy, a postman. Beside a man, he will bear favourable testimony concerning him. A dangerous rival, if followed by the Page of Cups. \
    Has the chief qualities of his suit. He may signify family intelligence. </p><p>Reversed: Anecdotes, announcements, evil news. Also indecision and the instability which accompanies it.</p>"
};

var KnightWands = {
  name: "Knight of Wands",
  index: 33,
  type: "Minor Arcana",
  suit: "Wands",
  element: "Fire",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/KNIGHTWANDS.PNG",
  rw_addendum:
    "A bad card; according to some readings, alienation. Reversed: For a woman, marriage, but probably frustrated.",
  rw_meaning:
    "<p>He is shewn as if upon a journey, armed with a short wand, and although mailed is not on a warlike errand. He is passing mounds or pyramids. \
    The motion of the horse is a key to the character of its rider, and suggests the precipitate mood, or things connected therewith. </p><p>Divinatory Meanings: \
    Departure, absence, flight, emigration. A dark young man, friendly. Change of residence. </p><p>Reversed: Rupture, division, interruption, discord.</p>"
};

var QueenWands = {
  name: "Queen of Wands",
  index: 34,
  type: "Minor Arcana",
  suit: "Wands",
  element: "Fire",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/QUEENWANDS.PNG",
  rw_addendum:
    "A good harvest, which may be taken in several senses. Reversed: Goodwill towards the Querent, but without the opportunity to exercise it.",
  rw_meaning:
    "<p>The Wands throughout this suit are always in leaf, as it is a suit of life and animation. Emotionally and otherwise, the Queen's personality \
    corresponds to that of the King, but is more magnetic.</p><p>Divinatory Meanings: A dark woman, countrywoman, friendly, chaste, loving, honurable. If the card \
    beside her signifies a man, she is well disposed towards him; if a woman, she is interested in the Querent. Also, love of money, or a certain success in business.\n\
    <p></p>Reversed: Good, economical, obliging, serviceable. Signifies also--but in certain positions and in the neighbourhood of other cards tending in such directions--\
    opposition, jealousy, even deceit and infidelity.</p>"
};

var KingWands = {
  name: "King of Wands",
  index: 35,
  type: "Minor Arcana",
  suit: "Wands",
  element: "Fire",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/KINGWANDS.PNG",
  rw_addendum:
    "Generally favourable may signify a good marriage. Reversed: Advice that should be followed.",
  rw_meaning:
    "<p>The physical and emotional nature to which this card is attributed is dark, ardent, lithe, animated, impassioned, noble. The King uplifts a flowering \
    wand, and wears, like his three correspondences in the remaining suits, what is called a cap of maintenance beneath his crown. He connects with the symbol of the lion, \
    which is emblazoned on the back of his throne.</p><p>Divinatory Meanings: Dark man, friendly, countryman, generally married, honest and conscientious. The card always signifies \
    honesty, and may mean news concerning an unexpected heritage to fall in before very long. </p><p>Reversed: Good, but severe; austere, yet tolerant.</p>"
};

/*====================================CUPS=======================================*/

var AceCups = {
  name: "Ace of Cups",
  index: 36,
  type: "Minor Arcana",
  suit: "Cups",
  element: "Water",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/ACECUPS.PNG",
  rw_addendum:
    "Inflexible will, unalterable law. Reversed: Unexpected change of position.",
  rw_meaning:
    "<p>The waters are beneath, and thereon are water-lilies; the hand issues from the cloud, holding in its palm the cup, from which four streams are pouring; \
    a dove, bearing in its bill a cross-marked Host, descends to place the Wafer in the Cup; the dew of water is falling on all sides. It is an intimation of that which may lie \
    behind the Lesser Arcana.</p><p>Divinatory Meanings: House of the true heart, joy, content, abode, nourishment, abundance, fertility; Holy Table, felicity hereof.</p><p>Reversed: House of \
    the false heart, mutation, instability, revolution.</p>"
};

var TwoCups = {
  name: "Two of Cups",
  index: 37,
  type: "Minor Arcana",
  suit: "Cups",
  element: "Water",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/2CUPS.PNG",
  rw_addendum:
    "Favourable in things of pleasure and business, as well as love; also wealth and honour. Reversed: Passion.",
  rw_meaning:
    "<p>A youth and maiden are pledging one another, and above their cups rises the Caduceus of Hermes, between the great wings of which there appear a lion's head. \
    It is a variant of a sign which is found in a few old examples of this card. Some curious emblematical meanings are attached to it, but they do not concern us in this place. \n\
    </p></p>Divinatory Meanings: Love, passion, friendship, affinity, union, concord, sympathy, the interrelation of the sexes, and--as a suggestion apart from all offices of divination--\
    that desire which is not in Nature, but by which Nature is sanctified.</p>"
};

var ThreeCups = {
  name: "Three of Cups",
  index: 38,
  type: "Minor Arcana",
  suit: "Cups",
  element: "Water",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/3CUPS.PNG",
  rw_addendum:
    "Unexpected advancement for a military man. Reversed: Consolation, cure, end of the business.",
  rw_meaning:
    "<p>Maidens in a garden-ground with cups uplifted, as if pledging one another.</p><p>Divinatory Meanings: The conclusion of any matter in plenty, perfection and merriment; \
    happy issue, victory, fulfilment, solace, healing.</p><p>Reversed: Expedition, dispatch, achievement, end. It signifes also the side of excess in physical enjoyment, and the pleasures\
    of the senses.</p>"
};

var FourCups = {
  name: "Four of Cups",
  index: 39,
  type: "Minor Arcana",
  suit: "Cups",
  element: "Water",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/4CUPS.PNG",
  rw_addendum: "Contrarieties. Reversed: Presentiment.",
  rw_meaning:
    "<p>A young man is seated under a tree and contemplates three cups set on the grass before him; an arm issuing from a cloud offers him another cup. His expression \
  notwithstanding is one of discontent with his environment.</p><p>Divinatory Meanings: Weariness, disgust, aversion, imaginary vexations, as if the wine of this world had caused satiety \
  only; another wine, as if a fairy gift, is now offered the wastrel, but he sees no consolation therein. This is also a card of blended pelasure.</p><p>Reversed: Novelty, presage, new instruction, \
  new relations.</p>"
};

var FiveCups = {
  name: "Five of Cups",
  index: 40,
  type: "Minor Arcana",
  suit: "Cups",
  element: "Water",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/5CUPS.PNG",
  rw_addendum:
    "Generally favourable; a happy marriage; also patrimony, legacies, gifts, success in enterprise.\n\
  Reversed: Return of some relative who has not been seen for long.",
  rw_meaning:
    "<p>A dark, cloaked figure, looking sideways at three prone cups; two others stand upright behind him; a bridge is in the background, leading to a small keep or holding.\n\
  <p></p>Divinatory Meanings: It is a card of loss, but something remains over; three have been taken, but two are left; it is a card of inheritance, patrimony, transmission, but not \
  corresponding to expectations; with some interpreters it is a card of marriage, but not without bitterness or frustration.</p><p>Reversed: News, alliances, affinity, consanguinity, \
  ancestry, return, false projects.</p>"
};

var SixCups = {
  name: "Six of Cups",
  index: 41,
  type: "Minor Arcana",
  suit: "Cups",
  element: "Water",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/6CUPS.PNG",
  rw_addendum: "Pleasant memories. Reversed: Inheritance to fall in quickly.",
  rw_meaning:
    "<p>Children in an old garden, their cups filled with flowers. </p><p>Divinatory Meanings: A card of the past and of memories, looking back, as--for example--on childhood; \
  happiness, enjoyment, but coming rather from the past; things that have vanished. Another reading reverses this, giving new relations, new knowledge, new environment, and then \
  the children are disporting in an unfamiliar precinct.</p><p>Reversed: The future, renewal, that which will come to pass presently.</p>"
};

var SevenCups = {
  name: "Seven of Cups",
  index: 42,
  type: "Minor Arcana",
  suit: "Cups",
  element: "fire",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/7CUPS.PNG",
  rw_addendum:
    "Fair child; idea, design, resolve, moment. Reversed: Success, if accompanied by the Three of Cups.",
  rw_meaning:
    "<p>Strange chalices of vision, but the images are more especially those of the fantastic spirit.</p><p>Divinatory Meanings: Fairy favours, images of reflection, \
    sentiment, imagination; things seen in the glass of contemplation; some attainment in these degrees, but nothing permanent or substantial is suggested.\n\
    Reversed: Desire, will, determination, project.</p>"
};

var EightCups = {
  name: "Eight of Cups",
  index: 43,
  type: "Minor Arcana",
  suit: "Cups",
  element: "Water",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/8CUPS.PNG",
  rw_addendum: "Marriage with a fair woman. Reversed: Perfect satisfaction.",
  rw_meaning:
    "<p>A man of dejected aspect is deserting the cups of his felicity, enterprise, undertaking or previous concern.</p><p>Divinatory Meanings: The card speaks for itself\
  on the surface, but other readings are entirely antithetical--giving joy, mildness, timidity, honour,  modesty. In practice, it is usually found that the card shews the decline\
  of a matter, or that a matter which has been thought to be important is really of slight consequence--either for good or evil.</p><p>Reversed: Great joy, happiness, feasting.</p>"
};

var NineCups = {
  name: "Nine of Cups",
  index: 44,
  type: "Minor Arcana",
  suit: "Cups",
  element: "Water",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/9CUPS.PNG",
  rw_addendum: "Of good augury for military men. Reversed: Good business.",
  rw_meaning:
    "<p>A goodly personage has feasted to his heart's content, and abundant refreshment of wine is on the arched counter behind him, seeming to indicate that the future \
  is also assured. The picture offers the material side only, but there are other aspects.</p><p>Divinatory Meanings: Concord, contentment, physical bien-etre; also victory, success, \
  advantage; satisfaction for the Querent or person for whom the consultation is made.</p><p>Reversed: Truth,  loyalty, liberty; but the readings vary and include mistakes, imperfections, etc.</p>"
};

var TenCups = {
  name: "Ten of Cups",
  index: 45,
  type: "Minor Arcana",
  suit: "Cups",
  element: "Water",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/10CUPS.PNG",
  rw_addendum:
    "For a male Querent, a good marriage and one beyond his expectations. Reversed: Sorrow; also a serious quarrel.",
  rw_meaning:
    "<p>Appearance of Cups in a rainbow; it is contemplated in wonder and ecstasy by a man and woman below, evidently husband and wife. His right arm is about her; his left \
    is raised upward; she raises her right arm. The two children dancing near them have not observed the prodigy but are happy after their own manner. There is a home-scene beyond.\n\
    <p></p>Divinatory Meanings: Contentment, repose of the entire heart; the perfection of that state; also perfection of human love and friendship; if with several picture-cards, a person \
    who is taking charge of the Querent's interests; also the town, village, or country inhabited by the Querent.</p><p>Reversed: Repose of the false heart, indignation, violence.</p>"
};

var PageCups = {
  name: "Page of Cups",
  index: 46,
  type: "Minor Arcana",
  suit: "Cups",
  element: "Water",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/PAGECUPS.PNG",
  rw_addendum:
    "Good augury; also a young man who is unfortunate in love. Reversed: Obstacles of all kinds.",
  rw_meaning:
    "<p>A fair, pleasing, somewhat effeminate page, of studious and intent aspect, contemplates a fish rising from a cup to look at him. It is the pictures of the mind taking \
    form.</p><p>Divinatory Meanings: Fair young man, one impelled to render service and with whom the Querent will be connected; a studious youth; news, message; application, reflection, \
    meditation; also these things directed to business.</p><p>Reversed: Taste, inclination, attachment, seduction, deception, artifice.</p>"
};

var KnightCups = {
  name: "Knight of Cups",
  index: 47,
  type: "Minor Arcana",
  suit: "Cups",
  element: "Water",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/KNIGHTCUPS.PNG",
  rw_addendum:
    "A visit from a friend, who will bring unexpected money to the Querent. Reversed: Irregularity.",
  rw_meaning:
    "<p>Graceful, but not warlike; riding quietly, wearing a winged helmet, referring to those higher graces of the imagination which sometimes characterize this card.\
    He too is a dreamer, but the images of the side of sense haunt him in his vision.</p><p>Divinatory Meanings: Arrival, approach--sometimes that of a messenger; advances, proposition, \
    demeanor, invitation, incitement.</p><p>Reversed: Trickery, artifice, subtlety, swindling, duplicity, fraud.</p>"
};

var QueenCups = {
  name: "Queen of Cups",
  index: 48,
  type: "Minor Arcana",
  suit: "Cups",
  element: "Water",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/QUEENCUPS.PNG",
  rw_addendum:
    "Sometimes denotes a woman of equivocal character. Reversed: A rich marriage for a man and a distinguished one for a woman.",
  rw_meaning:
    "<p>Beautiful, fair, dreamy--as one who sees visions in a cup. This is, however, only one of her aspects; she sees, but she also acts, and her activity feeds her \
    dream.</p><p>Divinatory Meanings: Good, fair woman; honest, devoted woman, who will do service to the Querent; loving intelligence, and hence the gift of vision; success, happiness, \
    pleasure; also wisdom, virtue; a perfect spouse and a good mother.</p><p>Reversed: The accounts vary; good woman; otherwise, distinguished woman but one not to be trusted; \
    perverse woman; vice, dishonour, depravity.</p>"
};

var KingCups = {
  name: "King of Cups",
  index: 49,
  type: "Minor Arcana",
  suit: "Cups",
  element: "Water",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/KINGCUPS.PNG",
  rw_addendum:
    "Beware of ill-will on the part of a man of position, and of hypocrisy pretending to help. Reversed: Loss.",
  rw_meaning:
    "<p>He holds a short sceptre in his left hand and a great cup in his right; his throne is set upon the sea; on one side a ship is riding and on the other \
    a dolphin is leaping. The implicit is that the Sign of the Cup naturally refers to water, which appears in all the court cards.</p><p>Divinatory Meanings: Fair man, man \
    of business, law, or divinity; responsible, disposed to oblige the Querent; also equity, art and science, including those who profess science, law and art; creative \
    intelligence.</p><p>Reversed: Dishonest, double-dealing man; roguery, exaction, injustice, vice, scandal, pillage, considerable loss.</p>"
};

/*========================================SWORDS==================================*/

var AceSwords = {
  name: "Ace of Swords",
  index: 50,
  type: "Minor Arcana",
  suit: "Swords",
  element: "Air",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/ACESWORDS.PNG",
  rw_addendum:
    "Great prosperity or great misery. Reversed: Marriage broken off, for a woman, through her own imprudence.",
  rw_meaning:
    "<p>A hand issues from a cloud, grasping a sword, the point of which is encircled by a crown. </p><p>Divinatory Meanings: Triumph, the excessive degree in everything, \
    conquest, triumph of force. It is a card of great force, in love as well as in hatred. The crown may carry a much higher significance than comes usually within the sphere \
    of fortune-telling. </p><p>Reversed: The same, but the results are disastrous; another account says--conception, childbirth, augmentation, multiplicity.</p>"
};

var TwoSwords = {
  name: "Two of Swords",
  index: 51,
  type: "Minor Arcana",
  suit: "Swords",
  element: "Air",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/2SWORDS.PNG",
  rw_addendum:
    "Gifts for a lady, influential protection for a man in search of help. Reversed: Dealings with rogues.",
  rw_meaning:
    "<p>A hoodwinked female figure balances two swords upon her shoulderes.</p><p>Divinatory Meanings: Conformity and the equipoise which it suggests, courage, friendship, \
    concord in a state of arms; another reading gives tenderness, affection, intimacy. The suggestion of harmony and other favourable readings must be considered in a qualified manner, \
    as Swords generally are not symbolical of beneficient forces in human affairs.</p><p>Reversed: Imposture, falsehood, duplicity, disloyalty.</p>"
};

var ThreeSwords = {
  name: "Three of Swords",
  index: 52,
  type: "Minor Arcana",
  suit: "Swords",
  element: "Air",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/3SWORDS.PNG",
  rw_addendum:
    "For a woman, the flight of her lover. Reversed: A meeting with one whom the Querent has compromised; also a nun.",
  rw_meaning:
    "<p>Three swords piercing a heart; cloud and rain behind.</p><p>Divinatory Meanings: Removal, absence, delay, division, rupture, dispersion, and all that the design \
    signifes naturally, being too simple and obvious to call for specific enumeration.</p><p>Reversed: Mental alienation, error, loss, distraction, disorder, confusion.</p>"
};

var FourSwords = {
  name: "Four of Swords",
  index: 53,
  type: "Minor Arcana",
  suit: "Swords",
  element: "Air",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/4SWORDS.PNG",
  rw_addendum:
    "A bad card, but if reversed a qualified success may be expected by wise administration of affairs.\n\
  Reversed: A certain success following wise administration.",
  rw_meaning:
    "<p>The effigy of a knight in the attitude of prayer, at full length upon his tomb.</p><p>Divinatory Meanings: Vigilance, retreat, solitude, hermit's repose, \
  exile, tomb and coffin. It is these last that have suggested the design. </p><p>Reversed: Wise administration, circumspection, economy, avarice, precaution, testament.</p>"
};

var FiveSwords = {
  name: "Five of Swords",
  index: 54,
  type: "Minor Arcana",
  suit: "Swords",
  element: "Air",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/5SWORDS.PNG",
  rw_addendum:
    "An attack on the fortune of the Querent. Reversed: A sign of sorrow and mourning.",
  rw_meaning:
    "<p>A disdainful man looks after two retreating and dejected figures. Their swords lie upon the ground. He carries two others on his left shoulder, and a third \
    sword is in his right hand, point to earth. He is the master in possession of the field. </p><p>Divinatory Meanings; Degradation, destruction, revocation, infamy, dishonour, loss, \
    with the variants and analogues of these. </p><p>Reversed: The same; burial and obsequies.</p>"
};

var SixSwords = {
  name: "Six of Swords",
  index: 55,
  type: "Minor Arcana",
  suit: "Swords",
  element: "Air",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/6SWORDS.PNG",
  rw_addendum:
    "The voyage will be pleasant. Reversed: Unfavourable issue of lawsuit.",
  rw_meaning:
    "<p>A ferryman carrying passengers in his punt to the further shore. The course is smooth, and seeing that the freight is light, it may be noted that the work is not \
    beyond his strength.</p><p>Divinatory Meanings: journey by water, route, way, envoy, commissionary, expedient.</p><p>Reversed: Declaration, confession, publicity; one account says \
    that it is a proposal of love.</p>"
};

var SevenSwords = {
  name: "Seven of Swords",
  index: 56,
  type: "Minor Arcana",
  suit: "Swords",
  element: "fire",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/7SWORDS.PNG",
  rw_addendum:
    "Dark girl; a good card; it promises a country life after a competence has been secured. Reversed: Good advice, probably neglected.",
  rw_meaning:
    "<p>A man in the act of carrying away five swords rapidly; the two others of the card remain stuck in the ground. A camp is close at hand. </p><p>Divinatory Meanings: \
    Design, attempt, wish, hope, confidence; also quarrelling, a plan that may fail, annoyance. The design is uncertain in its import, because the significations are widely at \
    variance with each other. </p><p>Reversed: Good advice, counsel, instruction, slander, babbling.</p>"
};

var EightSwords = {
  name: "Eight of Swords",
  index: 57,
  type: "Minor Arcana",
  suit: "Swords",
  element: "Air",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/8SWORDS.PNG",
  rw_addendum:
    "For a woman, scandal spread in her respect. Reversed: Departure of a relative.",
  rw_meaning:
    "<p>A woman, bound and hoodwinked, with the swords of the card about her. Yet it is rather a card of temporary durance than of irretrievable bondage. \n \
    <p></p>Divinatory Meanings: Bad news, violent chagrin, crisis, censure, power in trammels, conflict, calumny; also sickness. </p><p>Reversed: Disquiet, difficulty, opposition, \
    accident, treachery; what is unforeseen; fatality.</p>"
};

var NineSwords = {
  name: "Nine of Swords",
  index: 58,
  type: "Minor Arcana",
  suit: "Swords",
  element: "Air",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/9SWORDS.PNG",
  rw_addendum:
    "An ecclesiastic, a priest; generally, a card of bad omen. Reversed: Good ground for suspicion against a doubtful person.",
  rw_meaning:
    "<p>One seated on her couch in lamentation, with the swords over her. She is as one who knows no sorrow which is like unto hers. It is a card of utter desolation.</p><p>\
    Divinatory Meanings: Death, failure, miscarriage, delay, deception, disappointment, despair.</p><p>Reversed: Imprisonment, suspicion, doubt, reasonable fear, shame.</p>"
};

var TenSwords = {
  name: "Ten of Swords",
  index: 59,
  type: "Minor Arcana",
  suit: "Swords",
  element: "Air",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/10SWORDS.PNG",
  rw_addendum:
    "Followed by Ace and King, imprisonment; for girl or wife, treason on the part of friends.\n\
  Reversed: Victory and consequent fortune for a soldier in war.",
  rw_meaning:
    "<p>A prostrate figure, pierced by all the swords belonging to the card. </p><p>Divinatory Meanings: Whatsoever is intimated by the design; also pain, \
  affliction, tears, sadness, desolation. It is not especially a card of violent death. </p><p>Reversed: Advantage, profit, success, favour, but none of these are permanent; \
  also, power and authority.</p>"
};

var PageSwords = {
  name: "Page of Swords",
  index: 60,
  type: "Minor Arcana",
  suit: "Swords",
  element: "Air",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/PAGESWORDS.PNG",
  rw_addendum:
    "An indiscreet person will pry into the Querent's secrets. Reversed: Astonishing news.",
  rw_meaning:
    "<p>A lithe, active figure holds a sword upright in both hands, while in the act of swift walking. He is passing over rugged land, and about his way the clouds are \
    collocated wildly. He is alert and lithe, looking this way and that, as if an expected enemy might appear at any moment. </p><p>Divinatory Meanings: Authority, overseeing, secret \
    service, vigilance, spying, examination, and the qualities thereto belonging.</p><p>Reversed: More evil side of these qualities; what is unforeseen, unprepared state; sickness is also intimated.</p>"
};

var KnightSwords = {
  name: "Knight of Swords",
  index: 61,
  type: "Minor Arcana",
  suit: "Swords",
  element: "Air",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/KNIGHTSWORDS.PNG",
  rw_addendum:
    "A soldier, man of arms, satellite, stipendiary; heroic action predicted for soldier.\n\
  Reversed: Dispute with an imbecile person; for a woman, struggle with a rival, who will be conquered.",
  rw_meaning:
    "<p>He is riding in full course, as if scattering his enemies. In the design he is really a prototypical hero of romantic chivalry. He might almost be Galahad, whose sword \
  is swift and sure because he is clean of heart. </p><p>Divinatory Meanings: Skill, bravery, capacity, defence, address, enmity, wrath, war, destruction, opposition, resistance, ruin. \
  There is therefore a sense in which the card signifies death, but it carries this meaning only in its proximity to other cards of fatality. </p><p>Reversed: Imprudence, incapacity, extravagance.</p>"
};

var QueenSwords = {
  name: "Queen of Swords",
  index: 62,
  type: "Minor Arcana",
  suit: "Swords",
  element: "Air",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/QUEENSWORDS.PNG",
  rw_addendum:
    "A widow. Reversed: A bad woman, with ill-will towards the Querent.",
  rw_meaning:
    "<p>Her right hand raises the weapon vertically and the hilt rests on an arm of her royal chair. The left hand is extended, the arm raised; her countenance is severe but chastened; \
    it suggests familiarity with sorrow. It does not represent mercy, and, her sword notwithstanding, she is scarcely a symbol of power. </p><p>Divinatory Meanings: Widowhood, female sadness \
    and embarrassment, absence, sterility, mourning, privation, separation. </p><p>Reversed: Malice, bigotry, artifice, prudery, bale, deceit.</p>"
};

var KingSwords = {
  name: "King of Swords",
  index: 63,
  type: "Minor Arcana",
  suit: "Swords",
  element: "Air",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/KINGSWORDS.PNG",
  rw_addendum:
    "A lawyer, senator, doctor. Reversed: A bad man; also a caution to put an end to a ruinous lawsuit.",
  rw_meaning:
    "<p>He sits in judgment, holding the unsheathed sign of his suit. He recalls, of course, the conventional Symbol of justice in the Trumps Major, and he may represent \
    this virtue, but he is rather the power of life and death, in virtue of his office. </p><p>Divinatory Meanings: Whatsoever arises out of the idea of judgment and all its connexions-- \
    power, command, authority, militant intelligence, law, offices of the crown, and so forth. </p><p>Reversed: Cruelty, perversity, barbarity, perfidy, evil intention.</p>"
};

/*=====================================PENTACLES==================================*/

var AcePentacles = {
  name: "Ace of Pentacles",
  index: 64,
  type: "Minor Arcana",
  suit: "Pentacles",
  element: "Earth",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/ACEPENTACLES.PNG",
  rw_addendum:
    "The most favourable of all cards. Reversed: A share in the finding of treasure.",
  rw_meaning:
    "<p>A hand--issuing, as usual, from a cloud--holds up a pentacle. </p><p>Divinatory Meanings: Perfect contentment, felicity, ecstasy; also speedy intelligence; gold. \n \
    <p></p>Reversed: The evil side of wealth, bad intelligence; also great riches. In any case it shews prosperity, comfortable material conditions, but whether these are of advantage \
    to the possessor will depend on whether the card is reversed or not.</p>"
};

var TwoPentacles = {
  name: "Two of Pentacles",
  index: 65,
  type: "Minor Arcana",
  suit: "Pentacles",
  element: "Earth",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/2PENTACLES.PNG",
  rw_addendum:
    "Troubles are more imaginary than real. Reversed: Bad omen, ignorance, injustice.",
  rw_meaning:
    "<p>A young man, in the act of dancing, has a pentacle in either hand, and they are joined by that endless cord which is like the number 8 reversed. \n \
    <p></p>Divinatory Meanings: On the one hand it is represented as a card of gaiety, recreation and its connexions, which is the subject of the design; but it is read also as \
    news and messages in writing, as obstacles, agitation, trouble, embroilment.</p><p>Reversed: Enforced gaiety, simulated enjoyment, literal sense, handwriting, composition, letters \
    of exchange.</p>"
};

var ThreePentacles = {
  name: "Three of Pentacles",
  index: 66,
  type: "Minor Arcana",
  suit: "Pentacles",
  element: "Earth",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/3PENTACLES.PNG",
  rw_addendum:
    "If for a man, celebrity for his eldest son. Reversed: Depends on neighbouring cards.",
  rw_meaning:
    "<p>A sculptor at work in a monastery. Compare the design which illustrates the Eight of Pentacles. The apprentice or amateur therein has received his reward \
    and is now at work in earnest. </p><p>Divinatory Meanings: Metier, trade, skilled labour; usually, however, regarded as a card of nobility, aristocracy, renown, glory. </p><p>Reversed: \
    Mediocrity, in work and otherwise, puerility, pettiness, weakness.</p>"
};

var FourPentacles = {
  name: "Four of Pentacles",
  index: 67,
  type: "Minor Arcana",
  suit: "Pentacles",
  element: "Earth",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/4PENTACLES.PNG",
  rw_addendum:
    "For a bachelor, pleasant news from a lady. Reversed: Observation, hindrances.",
  rw_meaning:
    "<p>A crowned figure, having a pentacle over his crown, clasps another with hands and arms; two pentacles are under his feet. He holds to that which he has.</p><p>\
    Divinatory Meanings: The surety of possessions, cleaving to that which one has, gift, legacy, inheritance. </p><p>Reversed: Suspense, delay, opposition.</p>"
};

var FivePentacles = {
  name: "Five of Pentacles",
  index: 68,
  type: "Minor Arcana",
  suit: "Pentacles",
  element: "Earth",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/5PENTACLES.PNG",
  rw_addendum: "Conquest of fortune by reason. Reversed: Troubles in love.",
  rw_meaning:
    "<p>Two mendicants in a snow-storm pass a lighted casement. </p><p>Divinatory Meanings: The card foretells material trouble above all, whether in the form illustrated--\
  that is, destitution-- or otherwise. For some cartomancists, it is a card of love and lovers-wife, husband, friend, mistress; also concordance, affinities. These alternatives \
  cnanot be harmonized. </p><p>Reversed: Disorder, chaos, ruin, discord, profligacy.</p>"
};

var SixPentacles = {
  name: "Six of Pentacles",
  index: 69,
  type: "Minor Arcana",
  suit: "Pentacles",
  element: "Earth",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/6PENTACLES.PNG",
  rw_addendum:
    "The present must not be relied on. Reversed: A check on the Querent's ambition.",
  rw_meaning:
    "<p>A person in the guise of a merchant weighs money in a pair of scales and distributes it to the needy and distressed. It is a testimony to his own success \
    in life, as well as to his goodness of heart. </p><p>Divinatory Meanings: Presents, gifts, gratification. Another account says attention, vigilance, now is the accepted time, \
    present prosperity, etc. </p><p>Reversed: Desire, cupidity, envy, jealousy, illusion.</p>"
};

var SevenPentacles = {
  name: "Seven of Pentacles",
  index: 70,
  type: "Minor Arcana",
  suit: "Pentacles",
  element: "fire",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/7PENTACLES.PNG",
  rw_addendum:
    "Improved position for a lady's future husband. Reversed: Impatience, apprehension, suspicion.",
  rw_meaning:
    "<p>A young man, leaning on his staff, looks intently at seven pentacles attached to a clump of greenery on his right; one would say that these were his \
    treasures and that his heart was there. </p><p>Divinatory Meanings: These are exceedingly contradictory; in the main, it is a card of money, business, barter; but one reading \
    gives altercation, quarrels--and another innocence, ingenuity, purgation.</p><p>Reversed: Cause for anxiety regarding money which it may be proposed to lend.</p>"
};

var EightPentacles = {
  name: "Eight of Pentacles",
  index: 71,
  type: "Minor Arcana",
  suit: "Pentacles",
  element: "Earth",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/8PENTACLES.PNG",
  rw_addendum:
    "A young man in business who has relations with the Querent; a dark girl.\n\
  Reversed; The Querent will be compromised in a matter of money-lending.",
  rw_meaning:
    "<p>An artist in stone at his work, which he exhibits in the form of trophies. </p><p>Divinatory Meanings: Work, employment, commission, craftmanship, skill in craft and business, \
  perhaps in the preparatory stage. </p><p>Reversed: Voided ambition, vanity, cupidity, excavation, usury. It may also signify the possession of skill, in the sense of the ingenious mind turned \
  to cunning and intrigue.</p>"
};

var NinePentacles = {
  name: "Nine of Pentacles",
  index: 72,
  type: "Minor Arcana",
  suit: "Pentacles",
  element: "Earth",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/9PENTACLES.PNG",
  rw_addendum:
    "Prompt fulfilment of what is presaged by neighbouring cards. Reversed: Vain hopes.",
  rw_meaning:
    "<p>A woman, with a bird upon her wrist, stands amidst a great abundance of grapevines in the garden of a manorial house. It is a wide domain, suggesting plenty \
    in all things. Possibly it is her own possession and testifies to material well-being.</p><p>Divinatory Meanings: Prudence, safety, success, accomplishment, certitude, discernment.\n\
    Reversed: Roguery, deception, voided project, bad faith.</p>"
};

var TenPentacles = {
  name: "Ten of Pentacles",
  index: 73,
  type: "Minor Arcana",
  suit: "Pentacles",
  element: "Earth",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/10PENTACLES.PNG",
  rw_addendum:
    "Represents house or dwelling, and derives its value from other cards. \n\
  Reversed: an occasion which may be fortunate or otherwise.",
  rw_meaning:
    "<p>A man and woman beneath an archway which gives entrance to a house and domain. They are accompanied by a child, who looks curiously at two dogs accosting an ancient \
  personage seated in the foreground. The child's hand is on one of them.</p><p>Divinatory Meanings: Gain, riches; family matters, archives, extraction, the abode of a family.</p><p>Reversed: \
  Chance, fatality, loss, robbery, games of hazard; sometimes gift, dowry, pension.</p>"
};

var PagePentacles = {
  name: "Page of Pentacles",
  index: 74,
  type: "Minor Arcana",
  suit: "Pentacles",
  element: "Earth",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/PAGEPENTACLES.PNG",
  rw_addendum:
    "A dark youth; a young officer or soldier; a child. Reversed: Sometimes degradation and sometimes pillage.",
  rw_meaning:
    "<p>A youthful figure, looking intently at the pentacle which hovers over his raised hands. He moves slowly, insensible of that which is about him. \n \
    Divinatory Meanings: Application, study, scholarship, reflection. Another reading says news, messages and the bringer thereof; also rule, management. \n\
    Reversed: Prodigality, dissipation, liberality, luxury; unfavourable news.</p>"
};

var KnightPentacles = {
  name: "Knight of Pentacles",
  index: 75,
  type: "Minor Arcana",
  suit: "Pentacles",
  element: "Earth",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/KNIGHTPENTACLES.PNG",
  rw_addendum:
    "A useful man; useful discoveries. Reversed: A brave man out of employment.",
  rw_meaning:
    "<p>He rides a slow, enduring, heavy horse, to which his own aspect corresponds. He exhibits his symbol, but does not look therein.\n\
    <p></p>Divinatory Meanings: Utility, serviceableness, interest, responsibility, rectitude- all on the normal and external plane. </p><p>Reversed: inertia, \
    ideleness, repose of that kind, stagnation; also placidity, discouragement, carelesness.</p>"
};

var QueenPentacles = {
  name: "Queen of Pentacles",
  index: 76,
  type: "Minor Arcana",
  suit: "Pentacles",
  element: "Earth",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/QUEENPENTACLES.PNG",
  rw_addendum:
    "Dark woman; presents from a rich relative; rich and happy marriage for a young man. Reversed: an illness.",
  rw_meaning:
    "<p>The face suggests that of a dark woman, whose qualities might be summed up in the idea of greatness of soul; she has also the serious cast of intelligence; \
    she contemplates her symbol and may see worlds therein.\
    </p><p>Divinatory Meanings: Opulence, generosity, magnificence, security, liberty. </p><p>Reversed: Evil, suspicion, suspense, fear, mistrust.</p>"
};

var KingPentacles = {
  name: "King of Pentacles",
  index: 77,
  type: "Minor Arcana",
  suit: "Pentacles",
  element: "Earth",
  zodiac_sign: "NA",
  direction: upright_or_reversed(),
  img: "./images/KINGPENTACLES.PNG",
  rw_addendum:
    "A rather dark man, a merchant, master, professor. Reversed: An old and vicious man.",
  rw_meaning:
    "<p>The figure calls for no special description. The face is rather dark, suggesting also courage, but somewhat lethargic in tendency. The bull's head should be noted \
    as a recurrent symbol on the throne. The sign of this suit is represented throughout as engraved or blazoned with the pentagram, typifying the correspondence of the four elements \
    in human nature and that by which they may be governed. In many old Tarot packs this suit stood for current coin, money, deniers. I have not invented the substitution of pentacles \
    and I have no special cause to sustain in respect of the alternative. But the consensus of divinatory meanings is on the side of some change, because the cards do not happen to \
    deal especially with questions of money. </p><p>Divinatory Meanings: Valour, realizing intelligence, business and normal intellectual aptitude, sometimes mathematical gifts and attainments \
    of this kind; success in these paths.</p><p>Reversed: Vice, weakness, ugliness, perversity, corruption, peril.</p>"
};

/*======================================DECK======================================*/

//creates array with all card objects
var tarotDeck = [
  Fool,
  Magician,
  HighPriestess,
  Empress,
  Emperor,
  Hierophant,
  Lovers,
  Chariot,
  Strength,
  Hermit,
  WheelFortune,
  Justice,
  HangedMan,
  Death,
  Temperance,
  Devil,
  Tower,
  Star,
  Moon,
  Sun,
  Judgment,
  World,
  AceWands,
  TwoWands,
  ThreeWands,
  FourWands,
  FiveWands,
  SixWands,
  SevenWands,
  EightWands,
  NineWands,
  TenWands,
  PageWands,
  KnightWands,
  QueenWands,
  KingWands,
  AceCups,
  TwoCups,
  ThreeCups,
  FourCups,
  FiveCups,
  SixCups,
  SevenCups,
  EightCups,
  NineCups,
  TenCups,
  PageCups,
  KnightCups,
  QueenCups,
  KingCups,
  AceSwords,
  TwoSwords,
  ThreeSwords,
  FourSwords,
  FiveSwords,
  SixSwords,
  SevenSwords,
  EightSwords,
  NineSwords,
  TenSwords,
  PageSwords,
  KnightSwords,
  QueenSwords,
  KingSwords,
  AcePentacles,
  TwoPentacles,
  ThreePentacles,
  FourPentacles,
  FivePentacles,
  SixPentacles,
  SevenPentacles,
  EightPentacles,
  NinePentacles,
  TenPentacles,
  PagePentacles,
  KnightPentacles,
  QueenPentacles,
  KingPentacles
];

/*=========================BASIC CARD DRAWING FUNCTIONS===========================*/

//function that draws a specific card from the deck, by index
function draw_indexed_card(index) {
  var rightCard = tarotDeck[index];
  return rightCard;
}

//function to pick random int out of 78
function pick_card_index() {
  return getRndInteger(0, 77);
}

function draw_random_card() {
  index = pick_card_index();
  rightCard = tarotDeck[index];
  console.log("You drew ...", rightCard["name"]);
  console.log("The position of this card is ...", rightCard["direction"]);
  return rightCard;
}

var show_indexed_card = function (index) {
  //identifies correct card from deck!
  var rightCard = tarotDeck[index];
  //generic display message
  // document.getElementById("results").innerHTML +="The card drawn is...<br> <br> <div class='placard-container'><div class='card-container'>";
  //testing reverse or upright
  if (rightCard["direction"] == "reversed") {
    document.getElementById("results").innerHTML +=
      "<img src= '" +
      rightCard["img"] +
      "' class='reversed'>";
  } else {
    document.getElementById("results").innerHTML +=
      "<img src= '" + rightCard["img"] + "' class='card-img'><br>";
  }
  //display card name
  // document.getElementById("results").innerHTML +=
  //   "</div>" + rightCard["name"] + ", " + rightCard["direction"];
  document.getElementById("results").innerHTML +=
    "</div>" +
    "<p>&#x1F31E; &#x1F311; &#x1F312; &#x1F313; &#x1F314; &#x1F315; &#x1F316; &#x1F317; &#x1F318; &#x1F31E;</p>";
  return rightCard;
};

var show_indexed_card_no_reverse = function (i) {
  //like show_indexed_card(), but without reversed parameter
  var rightCard = tarotDeck[i];
  document.getElementById("results").innerHTML +=
    "<h3 id='show-card-num-" + rightCard["index"] + "'>" + rightCard["index"] + ". " + rightCard["name"] +
    "</h3><img src= '" +
    rightCard["img"] +
    "' width=220 height=auto><br><div class='explanation'>" + rightCard["rw_meaning"] +
    "</div><p>&#x1F31E; &#x1F311; &#x1F312; &#x1F313; &#x1F314; &#x1F315; &#x1F316; &#x1F317; &#x1F318; &#x1F31E;</p>";
  return rightCard;
};

//function which shows all cards in Tarot deck!
var show_all_cards = function () {
  var i = 0;
  for (i = 0; i < 78; i++) {
    show_indexed_card_no_reverse(i);
  }
  window.scrollTo(0, document.getElementById("show-card-num-0").y);
  console.log(document.getElementById("show-card-num-0").y);
  console.log(document.getElementById("show-card-num-0"));
  return;
};

/*==========================CELTIC CROSS CARD DRAWING FUNCTIONS=======================*/
var draw_celtic_indices = function () {
  var indices = [];
  var result;
  while (indices.length < 10) {
    result = pick_card_index();
    if (indices.indexOf(result) == -1) {
      indices.push(result);
    }
  }
  return indices;
};

var draw_celtic_picture = function (array) {
  var i = 0;
  for (i = 0; i < 10; i++) {
    console.log("inside draw celtic picture loop");
    show_indexed_card(array[i]["img"]);
  }
};

var set_celtic_identifier = function (card_obj, i) {
  //sets celtic array: 1) takes a card object with a number assigned
  //then assigns a string name (celtic identifier) to that object
  console.log("inside set_celtic_identifier");
  switch (i) {
    case 1:
      card_obj["identifier"] = "Present";
      break;
    case 2:
      card_obj["identifier"] = "Challenge";
      break;
    case 3:
      card_obj["identifier"] = "Past";
      break;
    case 4:
      card_obj["identifier"] = "Future";
      break;
    case 5:
      card_obj["identifier"] = "Above";
      break;
    case 6:
      card_obj["identifier"] = "Below";
      break;
    case 7:
      card_obj["identifier"] = "Advice";
      break;
    case 8:
      card_obj["identifier"] = "Influences";
      break;
    case 9:
      card_obj["identifier"] = "Hopes";
      break;
    case 10:
      card_obj["identifier"] = "Outcome";
      break;
  }
  return card_obj;
};

var is_reversed = function (direction) {
  if (direction == "reversed") {
    return true;
  }
};

var draw_celtic_cross = function () {
  console.log("inside draw_celtic_cross fct");
  //select randomized celtic indices
  var indices = draw_celtic_indices();
  console.log(indices);
  var i = 0;
  var j;
  var card;
  var celtic_result = [];
  //for each of the indices in the celtic index...
  for (i = 0; i < indices.length; i++) {
    j = i + 1;
    card = draw_indexed_card(indices[i]); //select the card associated with the index
    card["number"] = j; //assign cards to celtic indices array (celtic_result)
    set_celtic_identifier(card, card["number"]); //set a string associated with the number of celtic result
    console.log("card is ...", card);
    console.log("card['img'] is ...", card["img"]);
    document.getElementById("results").innerHTML +=
      "<div class='placard-container' id='celtic-exp-" +
      j +
      "'><div class='placard-container-item''celtic-identifier-name'>" +
      card["identifier"].toUpperCase() +
      "</div><div class='placard-container-item card-container'>" +
      "<div class='card-image-container'><img width=120px height=200px class='card-image card-container-item' src= '" +
      card["img"] +
      "' id='card-img-num-" +
      j +
      "'><p class='card-container-item' 'card-name'>" +
      card["name"] +
      ", " +
      card["direction"] +
      "</div><div class='placard-container-item card-explanation'>" +
      card["rw_meaning"] +
      "</div></div></div>";
    if (is_reversed(card["direction"])) {
      const card_image_ = document.getElementById("card-img-num-" + j);
      card_image_.classList.add("reversed");
    }
    celtic_result.push(card);
  }
  console.log("celtic result is ...", celtic_result);
  draw_cross_graphic(celtic_result);
  return celtic_result;
};

var draw_cross_graphic = function (array) {
  console.log("inside draw_cross_graphic");
  var i = 0;
  for (i = 0; i < array.length; i++) {
    var j = i + 1;
    document.getElementById("celtic-num-" + j).innerHTML +=
      "<img src= '" +
      array[i]["img"] +
      "' width=125 height=auto id='cc-img-num-" +
      j +
      "'>";
    if (is_reversed(array[i]["direction"])) {
      console.log("inside reversed,draw cross graphic");
      const cc_image_ = document.getElementById("cc-img-num-" + j);
      cc_image_.classList.add("reversed");
    }
  }
  return;
};

var erase_display = function () {
  document.getElementById("results").innerHTML = "";
  var i = 0;
  for (i = 0; i < 10; i++) {
    var j = i + 1;
    document.getElementById("celtic-num-" + j).innerHTML = "";
  }
};