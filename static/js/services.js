function AtelierJson() {
  const ATELIER_JSON = '/app/data/atelier.json';
  this.createLineUpForAtelier = async () => {
    try {
      const response = await fetch(ATELIER_JSON)
      const data = await response.json();
      return data
    } catch(error) {
      console.log(error)
    }
  }
}
function PressJson() {
  const PRESS_JSON = '/app/data/press.json';
  this.createLineUpForPressJson = async () => {
    try {
      const response = await fetch(PRESS_JSON)
      const data = await response.json();
      return data
    } catch(error) {
      console.log(error)
    }
  }
}
function ArtJson() {
  const ART_JSON = 'https://www.pgm.gent/data/arnequinze/art.json'
  this.createLineUpForArtJson = async () => {
    return new Promise((resolve, reject) => {
      fetch(ART_JSON)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    })
  }
}