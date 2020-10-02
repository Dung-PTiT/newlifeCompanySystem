package company.newlife.controller.api;

import company.newlife.model.Category;
import company.newlife.service.CategoryService;
import company.newlife.util.ApiResponse;
import company.newlife.util.paging.PagingRequest;
import company.newlife.util.paging.PagingResponse;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/category")
@Api(tags = "Users Rest Controller")
public class CategoryRestController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/getAll")
    public ApiResponse<List<Category>> getAll() {
        return new ApiResponse<>(true, categoryService.getAll());
    }

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<String> create(@RequestBody Category category) {
        categoryService.create(category);
        return new ApiResponse<>(true, "");
    }

    @PutMapping(value = "/update", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<String> update(@RequestBody Category category) {
        categoryService.update(category);
        return new ApiResponse<>(true, "");
    }

    @DeleteMapping("/delete/{id}")
    public ApiResponse<String> delete(@PathVariable("id") Integer id) {
        categoryService.delete(id);
        return new ApiResponse<>(true, "");
    }

    @PostMapping("/fetch")
    public ApiResponse<PagingResponse<Category>> fetch(@RequestBody PagingRequest request) {
        return new ApiResponse<>(true, categoryService.fetch(request));
    }

    @GetMapping("/getById/{id}")
    public ApiResponse<Category> getById(@PathVariable("id") Integer id) {
        return new ApiResponse<>(true, categoryService.get(id));
    }

}