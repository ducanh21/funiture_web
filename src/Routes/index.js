import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import { HeaderOnly } from '../Layout';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/contact', component: Contact, layout: HeaderOnly },
];

const priveteRoutes = [];

export { publicRoutes, priveteRoutes };
