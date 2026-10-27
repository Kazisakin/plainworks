// Real photos from Unsplash (free to use under the Unsplash License).
// To swap one, replace the URL, or drop your own file in /public/photos and use "/photos/name.jpg".
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=80`;

export const photos = {
  // company / tech
  earthNight: u("1451187580459-43490279c0fa"),    // earth at night from space
  cityNight: u("1603793510575-a8cf24361baa"),     // aerial city at night
  paper: u("1771758249853-415175dc29b9"),         // stack of papers
  paperPiles: u("1583521214690-73421a1829a9"),    // piles of documents
  stressed: u("1758611971935-331135af686d"),      // stressed man at desk
  stressedLaptop: u("1726649339367-c2577a28881b"),// frustrated at laptop
  dashboard: u("1763038311036-6d18805537e5"),     // woman with charts on laptop
  analytics: u("1608222351212-18fe0ec7b13b"),     // laptop analytics
  monitors: u("1779896412277-c4fd15c7a89c"),      // developer at monitors
  team: u("1680459575585-390ed5cfcae0"),          // team around a laptop
  teamDesk: u("1603201667141-5a2d4c673378"),      // team at laptops
  womanLaptop: u("1758876020491-9560594ec362"),   // smiling woman at laptop
  craftOwner: u("1773146916231-e6aeae932080"),    // small business owner, craft desk
  designer: u("1753162657634-454a046ea091"),      // fashion designer on laptop + phone
  circuit: u("1760842543713-108c3cadbba1"),       // circuit board
  servers: u("1580106815433-a5b1d1d53d85"),       // server hallway
  network: u("1597733336794-12d05021d510"),       // light network
  prototype: u("1599584933236-b93d637a8630"),     // engineer with hardware
  // regions
  dhaka: u("1706640254398-3b04782e8c76"),         // Dhaka aerial with river
  bdStreet: u("1722871513349-45c61ed6aa5f"),      // street in Bangladesh
  lagos: u("1648023199223-25d3622bcb13"),         // busy Lagos street
  nairobi: u("1669127300649-940337f1487e"),       // Nairobi skyline
  phones: u("1571867424488-4565932edb41"),        // two phones, mobile payments
  // PrepLabel page (product context)
  hands: u("1551218808-94e220e084d2"),
  herbs: u("1622021142947-da7dedc7c39a"),
  fridge: u("1785304968650-70951ecab87d"),
  portrait: u("1583394293214-28ded15ee548"),
};
