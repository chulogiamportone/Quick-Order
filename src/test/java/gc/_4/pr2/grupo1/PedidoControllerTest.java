package gc._4.pr2.grupo1;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;


@SpringBootTest
@AutoConfigureMockMvc
public class PedidoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testGuardarPedido() throws Exception {
        // JSON de ejemplo basado en tu listado
        String pedidoJson = """
        {
            "numero": 1010,
            "FechyHoraDePedido": "2025-10-31T18:00:00",
            "FechyHoraDeEntrega": "2025-10-31T19:00:00",
            "Estado": "En Preparación",
            "TiempoEstimado": "30 minutos",
            "empleado": {"id":1},
            "Lista_Mesas": [{"id":1}],
            "Lista_Productos": [
                {"id":1,"nombre":"Pizza Margarita"},
                {"id":7,"nombre":"Papas Fritas Chicas"}
            ]
        }
        """;

        mockMvc.perform(post("/pedidos")
                .contentType(MediaType.APPLICATION_JSON) // <- Obligatorio para @RequestBody
                .accept(MediaType.APPLICATION_JSON)
                .content(pedidoJson))
                .andExpect(status().isOk());
    }
}
