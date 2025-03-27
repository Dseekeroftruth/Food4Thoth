const media = [
      // Add your music data here (same structure as provided in your request)
      {
    title: 'Alphabet Soup',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2008 A.D.',
    album: 'Down The Rabbit Hole',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a21389df40f37f5ea2dd8f/56a213de89a60afe613ebd23/1453462502850/Inprogression+-+Down+the+Rabbit+Hole+-+01+Alphabet+Soup.mp3',
    showDetails: false
  },
  {
    title: 'Slag-Hammer',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2008 A.D.',
    album: 'Down The Rabbit Hole',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a21389df40f37f5ea2dd8f/56a213db8b38d42f19c309e1/1453462501901/Inprogression+-+Down+the+Rabbit+Hole+-+02+Slag-Hammer.mp3',
    showDetails: false
  },
  {
    title: 'Rabbit Hole',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2008 A.D.',
    album: 'Down The Rabbit Hole',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a21389df40f37f5ea2dd8f/56a213d289a60afe613ebceb/1453462494110/Inprogression+-+Down+the+Rabbit+Hole+-+03+Rabbit+Hole.mp3',
    showDetails: false
  },
  {
    title: 'RedHot',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2008 A.D.',
    album: 'Down The Rabbit Hole',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a21389df40f37f5ea2dd8f/56a213b689a60afe613ebc93/1453462467047/Inprogression+-+Down+the+Rabbit+Hole+-+07+RedHot.mp3',
    showDetails: false
  },
  {
    title: 'Epic',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2008 A.D.',
    album: 'Down The Rabbit Hole',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a21389df40f37f5ea2dd8f/56a213cf8b38d42f19c309c1/1453462491683/Inprogression+-+Down+the+Rabbit+Hole+-+04+Epic.mp3',
    showDetails: false
  },
  {
    title: 'Dramamatic',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2008 A.D.',
    album: 'Down The Rabbit Hole',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a21389df40f37f5ea2dd8f/56a213c78b38d42f19c309a7/1453462479022/Inprogression+-+Down+the+Rabbit+Hole+-+05+Dramamatic.mp3',
    showDetails: false
  },
  {
    title: 'Come along',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2008 A.D.',
    album: 'Down The Rabbit Hole',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a21389df40f37f5ea2dd8f/56a213c389a60afe613ebcb7/1453462482035/Inprogression+-+Down+the+Rabbit+Hole+-+06+Come+along.mp3',
    showDetails: false
  },
  {
    title: 'Take a look at the moon',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2008 A.D.',
    album: 'Down The Rabbit Hole',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a21389df40f37f5ea2dd8f/56a213b68b38d42f19c3097f/1453462470956/Inprogression+-+Down+the+Rabbit+Hole+-+08+Take+a+look+at+the+moon.mp3',
    showDetails: false
  },
  {
    title: 'Intro',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2009 A.D.',
    album: 'Time is Breaking',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a20f0eb209430cc410305b/56a20f481c1210f6d9c1e37f/1453461325210/Inprogression+-+Time+and+Energy+-+01+Intro.mp3',
    showDetails: false
  },
  {
    title: 'Stake',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2009 A.D.',
    album: 'Time is Breaking',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a20f0eb209430cc410305b/56a20f59a128e63a218b99dc/1453461347825/Inprogression+-+Time+and+Energy+-+03+Stake.mp3',
    showDetails: false
  },
  {
    title: 'Time is Breaking',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2009 A.D.',
    album: 'Time is Breaking',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a20f0eb209430cc410305b/56a20f4fa128e63a218b99be/1453461336906/Inprogression+-+Time+and+Energy+-+02+Time+is+Breaking.mp3',
    showDetails: false
  },
  {
    title: 'Anti-Dope',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2009 A.D.',
    album: 'Time is Breaking',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a20f0eb209430cc410305b/56a20f64a128e63a218b99fc/1453461357792/Inprogression+-+Time+and+Energy+-+04+Anti-Dope.mp3',
    showDetails: false
  },
  {
    title: '6 or 7 steps',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2009 A.D.',
    album: 'Time is Breaking',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a20f0eb209430cc410305b/56a20f78a128e63a218b9a31/1453461379323/Inprogression+-+Time+and+Energy+-+06+6+or+7+steps.mp3',
    showDetails: false
  },
  {
    title: 'Strawberry Preserves',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2009 A.D.',
    album: 'Time is Breaking',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a20f0eb209430cc410305b/56a20f6da128e63a218b9a18/1453461368372/Inprogression+-+Time+and+Energy+-+05+Strawberry+Preserves.mp3',
    showDetails: false
  },
  {
    title: 'Gun',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2009 A.D.',
    album: 'Time is Breaking',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a20f0eb209430cc410305b/56a20f83a128e63a218b9a59/1453461393066/Inprogression+-+Time+and+Energy+-+07+Gun.mp3',
    showDetails: false
  },
  {
    title: 'Line and Pull',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2009 A.D.',
    album: 'Time is Breaking',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a20f0eb209430cc410305b/56a20f91a128e63a218b9a8d/1453461395328/Inprogression+-+Time+and+Energy+-+08+Line+and+Pull.mp3',
    showDetails: false
  },
  {
    title: 'Not so Mighty',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2009 A.D.',
    album: 'Time is Breaking',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a20f0eb209430cc410305b/56a20f93a128e63a218b9aa4/1453461417706/Inprogression+-+Time+and+Energy+-+09+Not+so+Mighty.mp3',
    showDetails: false
  },
  {
    title: 'Playtime is for dangerous minds',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2009 A.D.',
    album: 'Time is Breaking',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a20f0eb209430cc410305b/56a20fb2a128e63a218b9b0c/1453461440152/Inprogression+-+Time+and+Energy+-+11+Playtime+is+for+dangerous+minds.mp3',
    showDetails: false
  },
  {
    title: 'Funk in the Trunk',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2009 A.D.',
    album: 'Time is Breaking',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a20f0eb209430cc410305b/56a20fa9a128e63a218b9aec/1453461426319/Inprogression+-+Time+and+Energy+-+10+Funk+in+the+Trunk.mp3',
    showDetails: false
  },
  {
    title: 'Understand freestyle music',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2009 A.D.',
    album: 'Time is Breaking',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a20f0eb209430cc410305b/56a20fc0a128e63a218b9b3c/1453461451246/Inprogression+-+Time+and+Energy+-+12+Understand+freestyle+music.mp3',
    showDetails: false
  },
	{
    title: 'Track 01',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2007 A.D.',
    album: 'Burned',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a38311a12f44304cb77b7a/56a38455df40f38ec6c70bf5/1453557077274/01+Track+01+1.mp3',
    showDetails: false
},
{
    title: 'Track 02',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2007 A.D.',
    album: 'Burned',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a38311a12f44304cb77b7a/56a3844e3b0be3eb2bfd77f0/1453557071424/02+Track+02+1.mp3',
    showDetails: false
},
{
    title: 'Track 03',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2007 A.D.',
    album: 'Burned',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a38311a12f44304cb77b7a/56a384463b0be3eb2bfd77cf/1453557062683/03+Track+03+1.mp3',
    showDetails: false
},
{
    title: 'Track 04',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2007 A.D.',
    album: 'Burned',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a38311a12f44304cb77b7a/56a38445df40f38ec6c70bc5/1453557057170/04+Track+04+1.mp3',
    showDetails: false
},
{
    title: 'Track 05',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2007 A.D.',
    album: 'Burned',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a38311a12f44304cb77b7a/56a3843e3b0be3eb2bfd77b0/1453557051255/05+Track+05+1.mp3',
    showDetails: false
},
{
    title: 'Track 06',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2007 A.D.',
    album: 'Burned',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a38311a12f44304cb77b7a/56a3843adf40f38ec6c70b98/1453557045796/06+Track+06+1.mp3',
    showDetails: false
},
{
    title: 'Track 07',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2007 A.D.',
    album: 'Burned',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a38311a12f44304cb77b7a/56a3842adf40f38ec6c70b6c/1453556794309/07+Track+07.mp3',
    showDetails: false
},
{
    title: 'Track 08',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2007 A.D.',
    album: 'Burned',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a38311a12f44304cb77b7a/56a384213b0be3eb2bfd7750/1453557038950/08+Track+08+1.mp3',
    showDetails: false
},
{
    title: 'Track 09',
    artist: 'INPROGRESSION',
    genre: 'Progressive Rock',
    released: '2007 A.D.',
    album: 'Burned',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/56a38311a12f44304cb77b7a/56a38421df40f38ec6c70b4a/1453557032212/09+Track+09+1.mp3',
    showDetails: false
},
	{
    title: 'Funkin Around',
    artist: 'DeJahn',
    genre: 'Experimental',
    released: '2012 A.D.',
    album: 'No Album',
    url: 'https://static1.squarespace.com/static/569ded85a128e6228959a613/t/56b0bbfd2eeb819ad6daaf05/1454423107728/ZOOM0003_ST001.mp3/original/ZOOM0003_ST001.mp3',
    showDetails: false
  },
	{
    title: 'Blip Blox 3',
    artist: 'DeJahn',
    genre: 'Experimental',
    released: '2024 A.D.',
    album: 'No Album',
    url: './music/BlipBlox3.wav',
    showDetails: false
  },
	{
    title: 'Mescalito Amazing Story',
    artist: 'DeJahn',
    genre: 'Experimental',
    released: '2012 A.D.',
    album: 'No Album',
    url: './music/MescalinosAmazingStory.wav',
    showDetails: false
  }
      // Add the rest of your tracks here...
    ];

    new Vue({
      el: '#media-list',
      data: {
        title: 'FOOD4THOTH Music Library',
        mediaList: media,
        album: '',
        currentlyPlaying: null,
        currentAudio: null
      },
      methods: {
        toggleDetails: function(media) {
          media.showDetails = !media.showDetails;
        },
        playAudio: function(media, event) {
          const audioElement = event.target;

          // Pause the previously playing audio if it’s different from the current one
          if (this.currentAudio && this.currentAudio !== audioElement) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
          }

          // Update the currentAudio and currentlyPlaying
          this.currentAudio = audioElement;
          this.currentlyPlaying = media;

          // Ensure that audio is playing
          if (audioElement.paused) {
            audioElement.play();
          }

          // Reset when the audio finishes playing
          audioElement.onended = () => {
            this.currentlyPlaying = null;
            this.currentAudio = null;
          };
        },
        filterList: function(event) {
          this.album = event.target.value;
        }
      },
      computed: {
        uniqueAlbumsList: function() {
          const albums = new Set(this.mediaList.map(item => item.album));
          return Array.from(albums);
        },
        filteredMediaList: function() {
          if (this.album) {
            return this.mediaList.filter(item => item.album === this.album);
          }
          return this.mediaList;
        }
      }
    });
		
		document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-nav');
    const navigation = document.getElementById('navigation');
    const navLinks = document.querySelectorAll('.neumorphic-tab');

    // Toggle main navigation visibility
    toggleButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click from triggering the document click listener
        const isHidden = navigation.classList.toggle('hidden');
        toggleButton.textContent = isHidden ? '☰ Nav' : '✖ Close';
    });

    // Handle submenu expansion
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const submenuId = link.getAttribute('data-expand');
            if (submenuId) {
                event.preventDefault(); // Prevent link navigation
                const submenu = document.getElementById(submenuId);
                submenu.classList.toggle('hidden'); // Toggle submenu visibility
            } else {
                navigation.classList.add('hidden'); // Hide navigation if it's a regular link
                toggleButton.textContent = '☰ Nav';
            }
        });
    });

    // Close navigation when clicking outside of it
    document.addEventListener('click', (event) => {
        if (!navigation.contains(event.target) && !toggleButton.contains(event.target)) {
            if (!navigation.classList.contains('hidden')) {
                navigation.classList.add('hidden');
                toggleButton.textContent = '☰ Nav';
            }
        }
    });
});