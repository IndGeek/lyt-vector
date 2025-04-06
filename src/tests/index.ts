import { VectorStore } from "../store";

const store = new VectorStore();

const id = store.addVector([0.9, 0.3, 0.1], { title: "Soumya", bio: "Programmer" });

const results = store.search([0.1, 0.2, 0.3], { threshold: 0.75, topK: 3 });

console.log(results);
