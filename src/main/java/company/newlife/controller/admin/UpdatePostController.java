package company.newlife.controller.admin;

import company.newlife.model.Post;
import company.newlife.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
public class UpdatePostController {
    @Autowired
    private PostService postService;

    @PostMapping("/api/admin/update-post")
    public ResponseEntity<String> updatePost(@RequestParam("postIdUpdate") Integer postIdUpdate,
                                             @RequestParam("postTitleUpdate") String postTitleUpdate,
                                             @RequestParam("postContentUpdate") String postContentUpdate,
                                             @RequestParam("postStatusUpdate") Boolean postStatusUpdate) {
        Post post = new Post();
        post.setId(postIdUpdate);
        post.setTitle(postTitleUpdate.trim());
        post.setContent(postContentUpdate.trim());
        post.setActive(postStatusUpdate);
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
        String formattedDate = dateFormat.format(new Date()).toString();
        post.setLastModifiedDate(formattedDate);
        postService.updateText(post);
        return new ResponseEntity<>("Cập nhật thành công", HttpStatus.OK);
    }
}


