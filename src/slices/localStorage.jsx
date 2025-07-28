export const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem("app_state");
        if (serializedState === null) return undefined;

        console.log('serializedState----loadFromLocalStorage', serializedState);
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn("Could not load from localStorage", e);
        return undefined;
    }
};

export const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        console.log('serializedState----saveToLocalStorage', serializedState);

        localStorage.setItem("app_state", serializedState);
    } catch (e) {
        console.warn("Could not save to localStorage", e);
    }
};
