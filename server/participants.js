class Participant {
  constructor(id, name, picture) {
    this.id = id; // Participant ID is same as socket ID
    this.name = name;
    this.picture = picture ?? name?.charAt(0).toUpperCase();
  }
}

const participants = [];

const addParticipant = (id, name, picture) => {
  const existingParticipant = participants.find(
    (participant) => participant.name === name
  );

  if (existingParticipant) return { error: "Participantname is taken." };

  const participant = new Participant(id, name, picture);

  participants.push(participant);

  return { id, name: participant.name, picture: participant.picture };
};

const removeParticipant = (id) => {
  const index = participants.findIndex((participant) => participant.id === id);

  if (index !== -1) return participants.splice(index, 1)[0];
};

const getParticipant = (id) =>
  participants.find((participant) => participant.id === id);

const getParticipants = () => participants;

module.exports = {
  addParticipant,
  removeParticipant,
  getParticipant,
  getParticipants,
};
