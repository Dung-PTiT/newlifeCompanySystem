package company.newlife.controller.api;

import company.newlife.model.Post;
import company.newlife.service.PostService;
import company.newlife.util.ApiResponse;
import company.newlife.util.paging.PagingRequest;
import company.newlife.util.paging.PagingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/post")
public class PostRestController {
    @Autowired
    private PostService postService;

    @GetMapping("/getAll")
    public ApiResponse<List<Post>> getAll() {
        return new ApiResponse<>(true, postService.getAll());
    }

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<String> create(@RequestBody Post post) {
        postService.create(post);
        return new ApiResponse<>(true, "");
    }

    @PutMapping(value = "/update", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<String> update(@RequestBody Post post) {
        postService.update(post);
        return new ApiResponse<>(true, "");
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<String> delete(@PathVariable("id") Integer id) {
        postService.delete(id);
        return new ApiResponse<>(true, "");
    }

    @PostMapping("/fetch")
    public ApiResponse<PagingResponse<Post>> fetch(@RequestBody PagingRequest request) {
        return new ApiResponse<>(true, postService.fetch(request));
    }

    @GetMapping("/getById/{id}")
    public ApiResponse<Post> getById(@PathVariable("id") Integer id) {
        return new ApiResponse<>(true, postService.get(id));
    }
}
