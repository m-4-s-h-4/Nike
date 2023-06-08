import { InjectionToken } from '@angular/core';

export interface APP_SETTINGS {

    dataSourceURL: { [key: string]: string };
    pageSize: number;
    language: string;
}

export const appSettings: APP_SETTINGS = {
    dataSourceURL: {
        'en': 'http://localhost:3000/products',
        'fr': 'http://localhost:8001/products',
        // 'en': 'https://fakestoreapi.com/products',
        // 'fr': '../assets/store_fr.json',
    },
    pageSize: 4,
    language: 'en',
};

export const APP_SETTINGS_TOKEN = new InjectionToken<APP_SETTINGS>('app.settings');