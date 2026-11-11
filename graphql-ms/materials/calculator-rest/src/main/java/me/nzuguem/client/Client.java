package me.nzuguem.client;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Client {

    public static void main(String[] args) {
        try(var client = HttpClient.newHttpClient()) {

            var jsonBody = """
                {
                  "a": 1,
                  "b": -5
                }
                """;

            var request = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:8080/calculator/add"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            HttpResponse<String> response = client.send(request,
                    HttpResponse.BodyHandlers.ofString());

            // Afficher le résultat
            System.out.println("Status Code: " + response.statusCode());
            System.out.println("Response Body: " + response.body());

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
