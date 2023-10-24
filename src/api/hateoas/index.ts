export class Hateoas {
  static createLink(rel: string, method: string, href: string) {
    return { rel, method, href };
  }

  static createResourceLinks(baseURL: string, resourceId: string) {
    const resourceURL = `${baseURL}/${resourceId}`;
    return [
      Hateoas.createLink("consult", "GET", resourceURL),
      Hateoas.createLink("create", "POST", baseURL),
      Hateoas.createLink("remove", "DELETE", resourceURL),
      Hateoas.createLink("update", "PATCH", resourceURL),
      Hateoas.createLink(
        "locations",
        "GET",
        `${resourceURL}/${resourceId}/location`
      ),
    ];
  }
}
