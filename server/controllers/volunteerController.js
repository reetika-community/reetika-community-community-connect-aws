// Placeholder data
let volunteers = [];

exports.registerVolunteer = (req, res) => {
  const { name, email, skills } = req.body;
  const newVolunteer = { id: volunteers.length + 1, name, email, skills };
  volunteers.push(newVolunteer);
  res.status(201).json(newVolunteer);
};

exports.getAllVolunteers = (req, res) => {
  res.status(200).json(volunteers);
};