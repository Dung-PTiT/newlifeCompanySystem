package company.newlife.controller.api;

import company.newlife.model.Tag;
import company.newlife.service.TagService;
import company.newlife.util.ApiResponse;
import company.newlife.util.paging.PagingRequest;
import company.newlife.util.paging.PagingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/tag")
public class TagRestController {
    @Autowired
    private TagService tagService;

    @GetMapping("/getAll")
    public ApiResponse<List<Tag>> getAll() {
        return new ApiResponse<>(true, tagService.getAll());
    }

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<String> create(@RequestBody Tag tag) {
        tagService.create(tag);
        return new ApiResponse<>(true, "");
    }

    @PutMapping(value = "/update", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<String> update(@RequestBody Tag tag) {
        tagService.update(tag);
        return new ApiResponse<>(true, "");
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<String> delete(@PathVariable("id") Integer id) {
        tagService.delete(id);
        return new ApiResponse<>(true, "");
    }

    @PostMapping("/fetch")
    public ApiResponse<PagingResponse<Tag>> fetch(@RequestBody PagingRequest request) {
        return new ApiResponse<>(true, tagService.fetch(request));
    }

    @GetMapping("/getById/{id}")
    public ApiResponse<Tag> getById(@PathVariable("id") Integer id) {
        return new ApiResponse<>(true, tagService.get(id));
    }

}

