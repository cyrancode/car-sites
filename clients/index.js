import reductionAutomobile from "./reduction-automobile";
import yankoAutomobile from "./yanko-automobile";

// Every car seller, by slug. Add a new client here.
const clients = {
  [reductionAutomobile.slug]: reductionAutomobile,
  [yankoAutomobile.slug]: yankoAutomobile,
};

export default clients;
