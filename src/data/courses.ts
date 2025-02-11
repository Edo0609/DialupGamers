import fetchFireBase from "../scripts/fetchFireBase";

const courses = await fetchFireBase(
  "https://dialup-8ed75-default-rtdb.europe-west1.firebasedatabase.app/.json"
);

export default courses;