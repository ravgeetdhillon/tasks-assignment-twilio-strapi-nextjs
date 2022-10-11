module.exports = {
  // Send assigned message
  async afterCreate(event) {
    const { result } = event;

    if (result.user && result.user.phoneNumber) {
      const body = `You have been assigned a new task - "${result.title}" which is due on ${result.dueDate}.`;
      strapi.service("api::task.whatsapp").sendWhatsappMessage({
        to: result.user.phoneNumber,
        body,
      });
    }
  },

  // Send unassign message
  async beforeUpdate(event) {
    const { params } = event;

    const entry = await strapi.entityService.findOne(
      "api::task.task",
      params.where.id,
      {
        populate: { user: true },
      }
    );

    if (
      entry.user &&
      result.user.phoneNumber &&
      entry.user.id !== params.data.user
    ) {
      const body = `You have been unassigned from task - "${entry.title}".`;
      strapi.service("api::task.whatsapp").sendWhatsappMessage({
        to: entry.user.phoneNumber,
        body,
      });
    }
  },

  // Send assigned message
  afterUpdate(event) {
    const { result } = event;

    if (result.user && result.user.phoneNumber) {
      const body = `You have been assigned a new task - "${result.title}" which is due on ${result.dueDate}.`;
      strapi.service("api::task.whatsapp").sendWhatsappMessage({
        to: result.user.phoneNumber,
        body,
      });
    }
  },
};
