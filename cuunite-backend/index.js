const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cu-unite.firebaseio.com"
});

const db = admin.firestore();

const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(cors());

// get all interests
app.get('/', async function (req, res) {
  res.send("Welcome to CU!Unite Backend!!");
});

// User's Interests
const interestsCollection = db.collection('Interests');

// create an interest
app.post('/createInterest', async function (req, res) {
  const interest = req.body;
  const addedInterest = await interestsCollection.add(interest);
  res.send(addedInterest.id);
});

// get all interests
app.get('/getInterests/:userid', async function (req, res) {
  const interests = await interestsCollection
    .where('userid', '==', req.params.userid)
    .get();
  res.json(interests.docs.map((i) => ({ ...i.data(), id: i.id })));
});

// get interest
app.get('/getInterest/:userid/:name', async function (req, res) {
  const interests = await interestsCollection
    .where('userid', '==', req.params.userid)
    .where('name', '==', req.params.name)
    .get();
  res.json(interests.docs.map((i) => ({ ...i.data(), id: i.id })));
});

// delete an interest
app.delete('/deleteInterest/:id', async function (req, res) {
  const id = req.params.id;
  await interestsCollection.doc(id).delete();
  res.send('DELETED');
});

// User's Groups
const yourGroupsCollection = db.collection('yourGroups');

// create a user group
app.post('/createGroup', async function (req, res) {
  const group = req.body;
  const addedGroup = await yourGroupsCollection.add(group);
  res.send(addedGroup.id);
});

// get all user groups
app.get('/getYourGroups/:userid', async function (req, res) {
  const groups = await yourGroupsCollection
    .where('userid', '==', req.params.userid)
    .get();
  res.json(groups.docs.map((g) => ({ ...g.data(), id: g.id })));
});

// get a user group
app.get('/getGroup/:userid/:name', async function (req, res) {
  const groups = await yourGroupsCollection
    .where('userid', '==', req.params.userid)
    .where('name', '==', req.params.name)
    .get();
  res.json(groups.docs.map((g) => ({ ...g.data(), id: g.id })));
});

// update a user group
app.post('/updateGroup/:id', async function (req, res) {
  const id = req.params.id;
  const newGroup = req.body;
  await yourGroupsCollection.doc(id).update(newGroup);
  res.send('UPDATED');
});

// delete a user group
app.delete('/deleteGroup/:id', async function (req, res) {
  const id = req.params.id;
  await yourGroupsCollection.doc(id).delete();
  res.send('DELETED');
});

// Recommended Groups
const recGroupsCollection = db.collection('recGroups');

// create a recommended group
app.post('/createRecGroup', async function (req, res) {
  const group = req.body;
  const addedGroup = await recGroupsCollection.add(group);
  res.send(addedGroup.id);
});

// get all recommended groups
app.get('/getRecGroups/:userid', async function (req, res) {
  const groups = await recGroupsCollection
    .where('userid', '==', req.params.userid)
    .get();
  res.json(groups.docs.map((g) => ({ ...g.data(), id: g.id })));
});

// get a recommended group
app.get('/getRecGroup/:userid/:name', async function (req, res) {
  const groups = await recGroupsCollection
    .where('userid', '==', req.params.userid)
    .where('name', '==', req.params.name)
    .get();
  res.json(groups.docs.map((g) => ({ ...g.data(), id: g.id })));
});

// update a recommended group
app.post('/updateRecGroup/:id', async function (req, res) {
  const id = req.params.id;
  const newGroup = req.body;
  await recGroupsCollection.doc(id).update(newGroup);
  res.send('UPDATED');
});

// delete a recommended group
app.delete('/deleteRecGroup/:id', async function (req, res) {
  const id = req.params.id;
  await recGroupsCollection.doc(id).delete();
  res.send('DELETED');
});

// All Groups in database
const allGroupsCollection = db.collection('allGroups');

// add a group to allGroups database
app.post('/addGroup', async function (req, res) {
  const group = req.body;
  const addedGroup = await allGroupsCollection.add(group);
  res.send(addedGroup.id);
});

// get all groups in database
app.get('/getAllGroups', async function (req, res) {
  const groups = await allGroupsCollection.get();
  res.json(groups.docs.map((g) => ({ ...g.data(), id: g.id })));
});

// get a group from database
app.get('/getGroupAll/:name', async function (req, res) {
  const groups = await allGroupsCollection
    .where('name', '==', req.params.name)
    .get();
  res.json(groups.docs.map((g) => ({ ...g.data(), id: g.id })));
});

// update a group
app.post('/updateGroupAll/:id', async function (req, res) {
  const id = req.params.id;
  const newGroup = req.body;
  await allGroupsCollection.doc(id).update(newGroup);
  res.send('UPDATED');
});

// delete a group
app.delete('/deleteGroupAll/:id', async function (req, res) {
  const id = req.params.id;
  await allGroupsCollection.doc(id).delete();
  res.send('DELETED');
});

app.listen(process.env.PORT || port, () => console.log('CU!Unite listening!'));
