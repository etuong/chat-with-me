class Participant {
  constructor(id, name, profilePic) {
    this.id = id; // Participant ID is same as socket ID
    const randomKey = Math.floor(Math.random() * 71);
    this.name = name || `Participant ${randomKey}`;
    this.profilePic =
      profilePic || `https://i.pravatar.cc/150?img=${randomKey}}`;
  }
}

const participants = [];

const addParticipant = (id, name, profilePic) => {
  const existingParticipant = participants.find(
    (participant) => participant.name === name
  );

  // if (existingParticipant) return { error: "Participant name is taken." };

  const participant = new Participant(id, name, profilePic);

  participants.push(participant);

  return { id, name: participant.name, profilePic: participant.profilePic };
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
