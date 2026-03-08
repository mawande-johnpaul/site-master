import { Routes } from '@angular/router';
import { Home } from './pages/student/home/home';
import { Default } from './pages/default/default';
import { Internships } from './pages/student/internships/internships';
import { Documents } from './pages/student/documents/documents';
import { Profile } from './pages/student/profile/profile';

export const routes: Routes = [
    { path: '', component: Default },
    {
        path: '0',
        children: [
            { path: 'dashboard', component: Home },
            { path: 'internships', component: Internships },
            { path: 'documents', component: Documents },
            { path: 'profile', component: Profile },
        ]
    },
    {
        path: '1',
        children: [
            // employer routes go here
        ]
    },
    { path: '**', redirectTo: '/0/dashboard' }
];
