const { producer } = require("../config/kafka");

const publishOrderCreated = async (order) => {
    try {
        await producer.send({
            topic: "order.created",
            messages: [
                {
                    key: order.orderId,
                    value: JSON.stringify(order),
                },
            ],
        })
    } catch (error) {
        console.error("Kafka Publish Error:", error);
    }
}

module.exports = { publishOrderCreated }