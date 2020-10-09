package company.newlife.controller.api;

import company.newlife.model.Post;
import company.newlife.model.UploadForm;
import company.newlife.service.PostService;
import company.newlife.util.FileDir;
import lombok.Value;
import org.apache.commons.io.FileUtils;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.apache.tomcat.util.http.fileupload.RequestContext;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
public class ImageController {
    @Autowired
    private FileDir fileDir;

    @Autowired
    private PostService postService;

    @RequestMapping(value = "/api/image/upload/{imageName}")
    @ResponseBody
    public byte[] uploadImage(@PathVariable(value = "imageName") String imageName) throws IOException {
        File serverFile = new File(fileDir.getFileDir() + imageName);
        return Files.readAllBytes(serverFile.toPath());
    }

    @PostMapping("/api/admin/update-image-post")
    public ResponseEntity<?> multiUploadFileModel(@ModelAttribute UploadForm form) {
        String result = null;
        try {
            result = this.saveUploadedFiles(form.getFile(), form.getPostId());
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Lỗi: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (result == "0") {
            return new ResponseEntity<>("Chưa chọn file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    // Save Files
    private String saveUploadedFiles(MultipartFile file, Integer postId) throws IOException {
        File uploadDir = new File(fileDir.getFileDir());
        uploadDir.mkdirs();

        if (file.isEmpty()) {
            return "0";
        }
        String uploadFilePath = fileDir.getFileDir() + "/" + file.getOriginalFilename();

        byte[] bytes = file.getBytes();
        Path path = Paths.get(uploadFilePath);
        Files.write(path, bytes);

        //update image for post
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
        String formattedDate = dateFormat.format(new Date()).toString();
        Post post = new Post();
        post.setId(postId);
        post.setImagePostUrl(file.getOriginalFilename());
        post.setLastModifiedDate(formattedDate);
        postService.updateImage(post);
        return "Cập nhật ảnh thành công";
    }
}
