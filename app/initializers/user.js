export function initialize(application) {
  application.inject('component', 'user', 'service:user');
}

export default {
  initialize
};
