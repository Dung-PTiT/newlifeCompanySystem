package company.newlife.controller.api;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Controller
public class ImageController {
    @RequestMapping(value = "/api/image/upload/{imageName}")
    @ResponseBody
    public byte[] uploadImage(@PathVariable(value = "imageName") String imageName) throws IOException {

        File serverFile = new File("C:\\Users\\Dell\\Desktop\\newlifeImage\\" + imageName);
        return Files.readAllBytes(serverFile.toPath());
    }
}
