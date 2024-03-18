package main

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"github.com/redis/go-redis/v9"
)

func main() {
	app := fiber.New()
	redisClient := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	redisCtx := context.Background()

	app.Post("/v1/message", func(c *fiber.Ctx) error {
		err := redisClient.Publish(redisCtx, "email_notification", c.Body()).Err()
		if err != nil {
			return c.Status(500).SendString("Failed to process the request")
		}
		return c.Status(200).SendString("Message is sent to redis queue")
	})

	app.Listen(":8081")
}
