const admin = require('firebase-admin'); // Mantenha a importação do admin aqui

// REMOVA estas linhas daqui:
// const db = admin.firestore();
// const collection = db.collection('carros');

exports.listar = async (req, res) => {
  try {
    const db = admin.firestore(); // <-- Obtenha a instância AQUI
    const collection = db.collection('carros'); // <-- Obtenha a coleção AQUI

    const snapshot = await collection.get();
    const carros = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(carros);
  } catch (err) {
    console.error("Erro ao listar carros:", err); // Adicione logging no erro
    res.status(500).send(err.message || 'Erro interno do servidor'); // Envie uma mensagem de erro mais segura
  }
};

exports.criar = async (req, res) => {
  try {
    const db = admin.firestore(); // <-- Obtenha a instância AQUI
    const collection = db.collection('carros'); // <-- Obtenha a coleção AQUI

    const docRef = await collection.add(req.body);
    const novo = await docRef.get();
    res.status(201).json({ id: novo.id, ...novo.data() });
  } catch (err) {
    console.error("Erro ao criar carro:", err); // Adicione logging no erro
    res.status(500).send(err.message || 'Erro interno do servidor'); // Envie uma mensagem de erro mais segura
  }
};

exports.atualizar = async (req, res) => {
  try {
    const db = admin.firestore(); // <-- Obtenha a instância AQUI
    const collection = db.collection('carros'); // <-- Obtenha a coleção AQUI

    await collection.doc(req.params.id).update(req.body);
    res.sendStatus(204);
  } catch (err) {
    console.error("Erro ao atualizar carro:", err); // Adicione logging no erro
    res.status(500).send(err.message || 'Erro interno do servidor'); // Envie uma mensagem de erro mais segura
  }
};

exports.deletar = async (req, res) => {
  try {
    const db = admin.firestore(); // <-- Obtenha a instância AQUI
    const collection = db.collection('carros'); // <-- Obtenha a coleção AQUI

    await collection.doc(req.params.id).delete();
    res.sendStatus(204);
  } catch (err) {
    console.error("Erro ao deletar carro:", err); // Adicione logging no erro
    res.status(500).send(err.message || 'Erro interno do servidor'); // Envie uma mensagem de erro mais segura
  }
};
