import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import menuItem from './schemas/menuItem';
import specialEvent from './schemas/specialEvent';

export default defineConfig({
  name: 'default',
  title: 'Habesha Salzburg',

  projectId: 'yp5xha26',
  dataset: 'production',

  plugins: [deskTool()],

  schema: {
    types: [menuItem, specialEvent],
  },
});
