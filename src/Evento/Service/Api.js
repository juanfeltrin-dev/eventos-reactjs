import React, { useEffect } from 'react';

export default class Api {
    constructor() {
    }

    async getCategories() {
        const res = await fetch('http://127.0.0.1:8000/api/category');
        return await res.json();
    }
    
    async getAges() {
        const res = await fetch('http://127.0.0.1:8000/api/age');
        return await res.json();
    }

    async getStates() {
        const res = await fetch('http://127.0.0.1:8000/api/state');
        return await res.json();
    }
}