const logger = require("../utils/logger");

class NotificationService {
  static async sendPaymentSuccessNotification(data) {
    // Replace with real email/SMS logic
    logger.info(`Sending payment success notification for order ${data.orderId}`);
  }

  static async sendPaymentFailureNotification(data) {
    logger.info(`Sending payment failure notification for order ${data.orderId}`);
  }
}

module.exports = NotificationService;