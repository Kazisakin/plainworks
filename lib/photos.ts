// Real photos from Unsplash (free to use under the Unsplash License).
// To swap one, replace the URL, or drop your own file in /public/photos and use "/photos/name.jpg".
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=80`;

export const photos = {
  kitchenWarm: u("1572715376701-98568319fd0b"),    // chef at the pass, warm light
  kitchenLine: u("1785068540682-6917367db28e"),    // chefs on a busy line
  kitchenBright: u("1776142519748-2b897acaecd7"),  // staff in red aprons
  hands: u("1551218808-94e220e084d2"),             // close-up hands slicing
  herbs: u("1622021142947-da7dedc7c39a"),          // chef chopping on green board
  fridge: u("1785304968650-70951ecab87d"),         // fridge shelves with containers
  containers: u("1606859191214-25806e8e2423"),     // colourful containers in fridge
  prep: u("1600565193348-f74bd3c7ccdf"),           // chef cooking at the line
  portrait: u("1583394293214-28ded15ee548"),       // chef, arms crossed
  ingredients: u("1466637574441-749b8f19452f"),    // fresh ingredients overhead
  mealprep: u("1543352632-5a4b24e4d2a6"),          // three prep containers
  counter: u("1556745750-68295fefafc5"),           // owner at the counter
};
