package company.newlife.controller.api;

import lombok.Value;
import org.apache.commons.io.FileUtils;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.apache.tomcat.util.http.fileupload.RequestContext;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Controller

public class ImageController {

    @RequestMapping(value = "/api/image/upload/{imageName}")
    @ResponseBody
    public byte[] uploadImage(@PathVariable(value = "imageName") String imageName) throws IOException {
        File serverFile = new File("C:\\Users\\Dell\\Desktop\\newlifeImage\\" + imageName);
        return Files.readAllBytes(serverFile.toPath());
    }

    @PostMapping("/api/admin/update-image-post")
    public String download(@RequestParam("fileName") MultipartFile multipartFile) {
        final String UPLOAD_FOLDER = "C:\\Users\\Dell\\Desktop\\newlifeImageSave\\";

        File file = new File(UPLOAD_FOLDER, Objects.requireNonNull(multipartFile.getOriginalFilename()));
        try {
            FileUtils.writeByteArrayToFile(file, multipartFile.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "redirect:/admin/manage/dashboard";
    }
}
